import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head,Link,useForm} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput";


export default function Create({auth, projects ,users}){

    const {data, setData, post, processing, errors, reset} = useForm({
        image: '',
        name: '',
        description: '',
        due_date: '',
        status: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.store"))
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center">
                <h2 
                className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
                >
                    Create New Tasks
                </h2>
                <Link 
                href={route('task.index')}
                className="bg-yellow-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-yellow-600"
                >
                    Back
                </Link>
            </div>
        }
        >
            <Head title="Create Task"/>

            <div className="py-12">
                {/* <pre>{JSON.stringify(users,undefined,2)}</pre> */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-1/2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form 
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_project_id"
                                    value="Task Project Name"
                                />
                                <SelectInput
                                    id="task_project_id"
                                    name="project_id"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('project_id', e.target.value)}
                                >
                                <option>Select Project Name</option>
                                {projects.data && projects.data.map((project) => (
                                    <option value={project.id} key={project.id}>{project.name}</option>
                                ))}
                                </SelectInput>
                                <InputError message={errors.project_id} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Task Image"
                                />
                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_name"
                                    value="Task Name"
                                />
                                <TextInput
                                    id="task_name"
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
                                    htmlFor="task_description"
                                    value="Task Description"
                                />
                                <TextAreaInput
                                    id="task_description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2"/>
                            </div>

                            
                            <div className="flex gap-4">

                                <div className="mt-4 w-1/2">
                                    <InputLabel
                                        htmlFor="task_due_date"
                                        value="Task Due Date"
                                    />
                                    <TextInput
                                        id="task_due_date"
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
                                        htmlFor="priority"
                                        value="Task Priority"
                                    />
                                    <SelectInput
                                        id="priority"
                                        name="priority"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('priority', e.target.value)}
                                    >
                                    <option>Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2"/>
                                </div>

                            </div>
                           
                            <div className="flex gap-4">

                                <div className="mt-4 w-1/2">
                                        <InputLabel
                                            htmlFor="task_assigned_user"
                                            value="Assigned User"
                                        />
                                        <SelectInput
                                            id="task_assigned_user"
                                            name="assigned_user_id"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('assigned_user_id', e.target.value)}
                                        >
                                        <option>Select Emp. Name</option>
                                        {users.data && users.data.map((user) => (
                                            <option value={user.id} key={user.id} >{user.name}</option>
                                        ))}
                                        
                                        </SelectInput>
                                        <InputError message={errors.assigned_user_id} className="mt-2"/>
                                    </div>

                                <div className="mt-4 w-1/2">
                                    <InputLabel
                                        htmlFor="task_status"
                                        value="Task Status"
                                    />
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                    <option>Select Staus</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Inprogress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2"/>
                                </div>

                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("task.index")}
                                    className="bg-gray-100 py-2 px-5 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="bg-emerald-500 py-2 px-5 text-gray-800 rounded shadow transition-all hover:bg-emerald-600 mr-2 "
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>



        </AuthenticatedLayout>
    )
}