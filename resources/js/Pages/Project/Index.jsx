import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/Constants.jsx"
import { Head, Link, router } from '@inertiajs/react';
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";



export default function Index({auth, projects, queryParams = null, success}){
    queryParams = queryParams || {}

    console.log(queryParams);
    const searchFieldChanged = (name, value) => {
      //  console.log(name,'-',value)
        if(value){
            queryParams[name] = value
        }else{
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
      //  console.log(queryParams)
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            }else{
                queryParams.sort_direction = 'asc'
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'desc';
        }
        router.get(route('project.index'), queryParams);
    };

    const deleteProject = (project) => {
        if(!window.confirm('Are you sure you want to delete the project?')){
            return;
        }
        router.delete(route('project.destroy',project.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 
                        className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
                    >
                        Projects
                    </h2>
                    <Link 
                        href={route("project.create")} 
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Project" />

           {/* {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded">
                    {success}
                </div>
           )}  */}

            <div className="py-12">
                {success && (
                    <div className="bg-emerald-500 py-2 px-4 mx-auto mb-3 w-1/2 text-white rounded">
                    {success}
                    </div>
                )}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(projects,undefined,2)}</pre> */}
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <th className="px-3 py-2">Image</th>
                                            <TableHeading
                                                name="Name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>
                                            <TableHeading
                                                name="status"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                status
                                            </TableHeading>
                                            <TableHeading
                                                name="create_date"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Create Date
                                            </TableHeading>
                                            <TableHeading
                                                name="due_date"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Due Date
                                            </TableHeading>
                                            <th className="px-3 py-2">Created by</th>
                                            <th className="px-3 py-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2">
                                                <TextInput 
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Project Name"
                                                onBlur={ (e) => 
                                                    searchFieldChanged('name', e.target.value)
                                                }
                                                onKeyPress={ (e) => onKeyPress('name', e.target.value)}
                                                />
                                            </th>
                                            <th className="px-3 py-2">
                                                <SelectInput 
                                                className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={ (e) => 
                                                        searchFieldChanged('status', e.target.value)
                                                } 
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Inprogress">Inprogress</option>
                                                    <option value="Completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                                <td className="px-3 py-2">{project.id}</td>
                                                <td className="px-3 py-2">
                                                <img src={project.image_path} alt="" style={{ width:60 }} />
                                                </td>
                                                {/* <td className="px-3 py-2">{project.name}</td> */}
                                                <th className="px-3 py-2 hover:underline hover:text-gray-200 text-nowrap">
                                                    <Link href={route("project.show",project.id)}>
                                                        {project.name}
                                                    </Link> 
                                                </th>
                                                <td className="px-3 py-2">
                                                    <span className={
                                                        "px-2 py-1 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[project.status]
                                                    }>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]} 
                                                    </span>
                                                
                                                </td>
                                                <td className="px-3 py-2">{project.created_at}</td>
                                                <td className="px-3 py-2">{project.due_date}</td>
                                                <td className="px-3 py-2">{project.createdBy.name}</td>
                                                <td className="px-3 py-2">
                                                    <Link 
                                                        href={route('project.edit',project.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={(e) => deleteProject(project)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                                <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
