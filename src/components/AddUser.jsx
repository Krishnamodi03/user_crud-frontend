import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "../validationSchema"
const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data) => {
        console.log("Form data : ", data)
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-900'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-800 p-8 rounded-lg shadow-lg w-[35rem] text-white space-y-4'>
                <h1 className='text-2xl font-bold text-white text-center uppercase'>Registeration Form</h1>
                <div>
                    <label htmlFor="firstName" className='block mb-2'>First Name<sup className="text-red-500">*</sup></label>
                    <input type="text"
                        id='firstName'
                        {...register('firstName')}
                        className='border rounded p-2 w-full text-gray-800' />
                    {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
                </div>

                <div>
                    <label htmlFor="lastName" className='block mb-2'>Last Name<sup className="text-red-500">*</sup></label>
                    <input type="text"
                        id='lastName'
                        {...register('lastName')}
                        className='border rounded p-2 w-full text-gray-800' />
                    {errors.firstName && <p className='text-red-500'>{errors.lastName.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className='block mb-2'>Email<sup className="text-red-500">*</sup></label>
                    <input type="email"
                        id='email'
                        {...register('email')}
                        className='border rounded p-2 w-full text-gray-800' />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block mb-2">Phone<sup className="text-red-500">*</sup></label>
                    <input
                        id="phone"
                        type="text"
                        {...register('phone')}
                        className="border rounded p-2 w-full text-gray-800"
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2">Password<sup className="text-red-500">*</sup></label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        className="border rounded p-2 w-full text-gray-800 mb-5"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>

                <button type='submit' className='bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-800' onClick={() => { onSubmit }}>Submit</button>
            </form>
        </div>
    )
}

export default AddUser