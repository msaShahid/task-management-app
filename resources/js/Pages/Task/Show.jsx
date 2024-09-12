import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,Link } from '@inertiajs/react';
import {
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
} from "@/Constants.jsx"
import TaskTable from "../Task/TaskTable";

export default function Show({ auth, task, queryParams = null}){
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
               <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Task ${task.name}`}
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
            <Head title="Task"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={task.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                           {/* Show Content */}

                            {/* left Side */}
                           <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Task id : </label>
                                        <span className="mt-1">{task.id}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Project Name : </label>
                                        <span className="mt-1">{task.project.name}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Task Name : </label>
                                        <span className="mt-1">{task.name}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold"> Status : </label>
                                        <span className={
                                            "px-2 py-1 rounded text-white " +
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        }>
                                            {TASK_STATUS_TEXT_MAP[task.status]} 
                                        </span>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold"> Created By : </label>
                                        <span className="mt-1">{task.createdBy.name}</span>
                                    </div>
                                </div>
                                {/* Right Side */}
                                <div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Create Date : </label>
                                        <span className="mt-1">{task.created_at}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Due Date : </label>
                                        <span className="mt-1">{task.due_date}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Update By : </label>
                                        <span className="mt-1">{task.updatedBy.name}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold"> Priority : </label>
                                        <span className={
                                            "px-2 py-1 rounded text-white " + 
                                            TASK_PRIORITY_CLASS_MAP[task.priority]
                                        }>
                                            {TASK_PRIORITY_TEXT_MAP[task.priority]} 
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Task Assigned To: </label>
                                        <span className="mt-1">{task.assignedUser.name}</span>
                                    </div> 
                                    
                                </div>

                            </div>

                            <div className="mt-4">
                                <label htmlFor="" className="font-bold">Task Description : </label>
                                <span className="mt-1">{task.description}</span>
                            </div>                             

                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    )
}