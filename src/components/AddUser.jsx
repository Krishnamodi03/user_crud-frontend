import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "../validationSchema"
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data) => {
        try {
            console.log("Form data : ", data)
            const response = await axios.post(`http://localhost:8080/auth/signup`, data)
            console.log(response.data)
            alert(response.data.message)
        } catch (error) {
            console.error("Error submitting form: ", error)
            alert(error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen bg-gray-900'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-800 p-8 rounded-lg shadow-lg lg:w-[35rem] md:w-[30rem] text-white space-y-4'>
                <h1 className='text-2xl font-bold text-white text-center uppercase'>Registration Form</h1>

                <div>
                    <label htmlFor="First_name" className='block mb-2'>First Name<sup className="text-red-500">*</sup></label>
                    <input type="text"
                        id='First_name'
                        {...register('First_name')}
                        className='border rounded p-2 w-full text-gray-800' />
                    {errors.First_name && <p className='text-red-500'>{errors.First_name.message}</p>}
                </div>

                <div>
                    <label htmlFor="Last_name" className='block mb-2'>Last Name<sup className="text-red-500">*</sup></label>
                    <input type="text"
                        id='Last_name'
                        {...register('Last_name')}
                        className='border rounded p-2 w-full text-gray-800' />
                    {errors.Last_name && <p className='text-red-500'>{errors.Last_name.message}</p>}
                </div>

                <div>
                    <label htmlFor="Email" className='block mb-2'>Email<sup className="text-red-500">*</sup></label>
                    <input type="Email"
                        id='Email'
                        {...register('Email')}
                        className='border rounded p-2 w-full text-gray-800' />
                    {errors.Email && <p className='text-red-500'>{errors.Email.message}</p>}
                </div>

                <div>
                    <label htmlFor="Phone" className="block mb-2">Phone<sup className="text-red-500">*</sup></label>
                    <input
                        id="Phone"
                        type="text"
                        {...register('Phone')}
                        className="border rounded p-2 w-full text-gray-800"
                    />
                    {errors.Phone && <p className="text-red-500">{errors.Phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="Password" className="block mb-2">Password<sup className="text-red-500">*</sup></label>
                    <input
                        id="Password"
                        type="Password"
                        {...register('Password')}
                        className="border rounded p-2 w-full text-gray-800 "
                    />
                    {errors.Password && <p className="text-red-500">{errors.Password.message}</p>}
                </div>

                <div>
                    <label htmlFor="User_type" className="block mb-2">User Type<sup className="text-red-500">*</sup></label>
                    <select
                        id="User_type"
                        {...register('User_type')}
                        className="border rounded p-2 w-full text-gray-800"
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN" disabled>Admin</option>
                    </select>
                    {errors.User_type && <p className="text-red-500">{errors.User_type.message}</p>}
                </div>
                <div className='mb-5 text-right'>
                    Already have an account? <NavLink to="/admin-login" className="text-blue-600 hover:underline">login</NavLink>
                </div>
                <button type='submit' className='bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-800'>Submit</button>
            </form>
        </div>
    )
}

export default AddUser
