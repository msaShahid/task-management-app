import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,Link } from '@inertiajs/react';
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/Constants.jsx"
import TaskTable from "../Task/TaskTable";

export default function Show({ auth, project, tasks, queryParams = null}){
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
               <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Project ${project.name}`}
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
            <Head title="Project"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={project.image_path}
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
                                        <label htmlFor="" className="font-bold">Project id : </label>
                                        <span className="mt-1">{project.id}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold"> Name : </label>
                                        <span className="mt-1">{project.name}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold"> Status : </label>
                                        <span className={
                                            "px-2 py-1 rounded text-white " +
                                            PROJECT_STATUS_CLASS_MAP[project.status]
                                        }>
                                            {PROJECT_STATUS_TEXT_MAP[project.status]} 
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold"> Created By : </label>
                                        <span className="mt-1">{project.createdBy.name}</span>
                                    </div>
                                </div>
                                {/* Right Side */}
                                <div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Create Date : </label>
                                        <span className="mt-1">{project.created_at}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Due Date : </label>
                                        <span className="mt-1">{project.due_date}</span>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="font-bold">Update By : </label>
                                        <span className="mt-1">{project.updatedBy.name}</span>
                                    </div>  
                                </div>

                            </div>

                            <div className="mt-4">
                                <label htmlFor="" className="font-bold"> Description : </label>
                                <span className="mt-1">{project.description}</span>
                            </div> 

                        </div>
                    </div>
                </div>
            </div>
                {/* Task table list */}
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <TaskTable tasks={tasks} queryParams={queryParams} hideProjectColumn={true} /> 
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}