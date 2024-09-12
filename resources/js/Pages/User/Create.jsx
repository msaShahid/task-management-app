import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head,Link,useForm} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput";


export default function Create({auth}){

    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        passwoed: '',
        password_confirmation: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("user.store"))
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center">
                <h2 
                className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
                >
                    Create New Users
                </h2>
                <Link 
                href={route('user.index')}
                className="bg-yellow-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-yellow-600"
                >
                    Back
                </Link>
            </div>
        }
        >
            <Head title="Create User"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-1/2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form 
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="user_name"
                                    value="Name"
                                />
                                <TextInput
                                    id="user_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="user_email"
                                    value="Email"
                                />
                                <TextInput
                                    id="user_email"
                                    type="email"
                                    email="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    
                                    onChange={e => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="user_password"
                                    value="Password"
                                />
                                <TextInput
                                    id="user_password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    
                                    onChange={e => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2"/>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="user_password_confirmation"
                                    value="Confirmation Password "
                                />
                                <TextInput
                                    id="user_password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} className="mt-2"/>
                            </div>
          

                            

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("user.index")}
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