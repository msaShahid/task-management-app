import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head,Link,useForm} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput";


export default function Create({auth, project}){

    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: project.name || "",
        status: project.status || "",
        description: project.description || "",
        due_date: project.due_date || "",
        _method: "PUT",
    });

     const onSubmit = (e) => {
        e.preventDefault();
       // console.log(project.id);
        post(route('project.update',project.id));
     }
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 
                    className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
                    >
                     Edit Projects "{project.name}"
                    </h2>
                    <Link 
                    href={route('project.index')}
                    className="bg-yellow-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-yellow-600"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title="Create Project"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-1/2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form 
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            {/* <pre>{JSON.stringify(data,undefined,2)}</pre> */}
                            {project.image_path && 
                                <div className="mt-4">
                                    <img src={project.image_path} className="w-64" />
                                </div>
                            }
                            <div className="">
                                <InputLabel
                                    htmlFor="project_image_path"
                                    value="Project Image"
                                />
                                <TextInput
                                    id="project_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_name"
                                    value="Project Name"
                                />
                                <TextInput
                                    id="project_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="project_description"
                                    value="Project Description"
                                />
                                <TextAreaInput
                                    id="project_description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2"/>
                            </div>

                            <div className="mt-4 w-1/2">
                                <InputLabel
                                    htmlFor="project_due_date"
                                    value="Project Due Date"
                                />
                                <TextInput
                                    id="project_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                />
                                <InputError message={errors.due_date} className="mt-2"/>
                            </div>

                            <div className="mt-4 w-1/2">
                                <InputLabel
                                    htmlFor="project_status"
                                    value="Project Status"
                                />
                                <SelectInput
                                    id="project_status"
                                    name="status"
                                    className="mt-1 block w-full"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                <option>Select Staus</option>
                                <option value="Pending">Pending</option>
                                <option value="Inprogress">In Progress</option>
                                <option value="Completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2"/>
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("project.index")}
                                    className="bg-gray-100 py-2 px-5 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="bg-emerald-500 py-2 px-5 text-gray-800 rounded shadow transition-all hover:bg-emerald-600 mr-2 "
                                >
                                    Update
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>



        </AuthenticatedLayout>
    )
}