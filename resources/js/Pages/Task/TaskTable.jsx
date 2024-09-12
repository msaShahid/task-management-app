
import Pagination from "@/Components/Pagination";
import { Head, Link, router } from '@inertiajs/react';
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import {
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/Constants.jsx"

export default function TaskTable({tasks, queryParams = null, hideProjectColumn = false}) {

    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
      //  console.log(name,'-',value)
        if(value){
            queryParams[name] = value
        }else{
            delete queryParams[name]
        }

        router.get(route('task.index'), queryParams);
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
            queryParams.sort_direction = 'asc';
        }
        router.get(route('task.index'), queryParams);
    };
    const deleteTask = (task) => {
        if(!window.confirm('Are you sure you want to delete the task?')){
            return;
        }
        router.delete(route('task.destroy',task.id));
    }

    return (
        <>
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
                            { !hideProjectColumn && (<th className="px-3 py-2">Project Name</th>) }
                            <TableHeading
                                name="name"
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
                            {!hideProjectColumn && (<th className="px-3 py-2"></th>)}
                            <th className="px-3 py-2">
                                <TextInput 
                                className="w-full"
                                defaultValue={queryParams.name}
                                placeholder="Task Name"
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
                        {tasks.data.map((task) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                                <td className="px-3 py-2">{task.id}</td>
                                <td className="px-3 py-2">
                                <img src={task.image_path} alt="" style={{ width:60 }} />
                                </td>
                                {!hideProjectColumn && ( 
                                    <td className="px-3 py-2">{task.project.name}</td>
                                )}
                                {/* <td className="px-3 py-2">{task.name}</td> */}
                                <th className="px-3 py-2 hover:underline hover:text-gray-200">
                                                    <Link href={route("task.show",task.id)}>
                                                        {task.name}
                                                    </Link> 
                                                </th>
                                <td className="px-3 py-2">
                                    <span className={
                                        "px-2 py-1 rounded text-white " +
                                        TASK_STATUS_CLASS_MAP[task.status]
                                    }>
                                        {TASK_STATUS_TEXT_MAP[task.status]} 
                                    </span>
                                
                                </td>
                                <td className="px-3 py-2">{task.created_at}</td>
                                <td className="px-3 py-2">{task.due_date}</td>
                                <td className="px-3 py-2">{task.createdBy.name}</td>
                                <td className="px-3 py-2">
                                    <Link 
                                        href={route('task.edit',task.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={(e) => deleteTask(task)}
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
            <Pagination links={tasks.meta.links} />
        </>
    )
}