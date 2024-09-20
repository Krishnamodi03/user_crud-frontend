import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../loginValidationSchema"
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data) => {
        try {
            console.log("Login data: ", data)
            // Make the API request here
            const response = await axios.post('http://localhost:8080/auth/login', data);
            if (response.status == 200) {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                window.location.href = '/';
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in: ", error.response.data)
            alert(error.response.data.error)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen bg-gray-900'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-800 p-8 rounded-lg shadow-lg lg:w-[35rem] md:w-[30rem] text-white space-y-4'>
                <h1 className='text-2xl font-bold text-white text-center uppercase'>Login Form</h1>

                <div>
                    <label htmlFor="email" className='block mb-2'>Email<sup className="text-red-500">*</sup></label>
                    <input type="email"
                        id='email'
                        {...register('email')}
                        className='border rounded p-2 w-full text-gray-800' />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2">Password<sup className="text-red-500">*</sup></label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        className="border rounded p-2 w-full text-gray-800"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>

                <div className='mb-5 text-right'>
                    Don't have an account? <NavLink to="/add-user" className="text-blue-600 hover:underline">Register</NavLink>
                </div>

                <button type='submit' className='bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-800'>Login</button>
            </form>
        </div>
    )
}

export default Login
