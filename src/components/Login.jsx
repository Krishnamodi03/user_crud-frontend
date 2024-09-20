import React from 'react'

const Login = () => {
    return (
        <div className='bg-gray-900 min-h-screen p-10 flex justify-center items-center'>
            <div className='size-[400px] bg-gray-800 rounded-lg p-5'>
                <h1 className='text-3xl font-bold mb-12 text-white text-center'>LOGIN FORM</h1>
                <form className='flex flex-col gap-5'>
                    <div>
                        <label htmlFor="email" className='block text-white'>Email<sup className="text-red-500">*</sup></label>
                        <input type="email" placeholder='Email' id='email' className='p-2 w-full border border-gray-
                500 rounded-md' />
                    </div>
                    <div>
                        <label htmlFor="password" className='block text-white'>Password<sup className="text-red-500">*</sup></label>
                        <input type="password" placeholder='Password' id='password' className='p-2 w-full border border-gray-
                500 rounded-md' />
                    </div>
                    <button className='mt-5 bg-blue-500 hover:bg-blue-700 text-white text-2xl h-14 rounded'>Login</button>
                </form>
            </div>

        </div>
    )
}

export default Login