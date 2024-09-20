import React from 'react'

const AddUser = () => {
    return (
        <div className='bg-gray-900 min-h-screen text-white p-10'>
            <h1 className='text-3xl font-bold mb-5'>Add User</h1>
            <form className='flex flex-col gap-5'>
                <input type="text" placeholder='Name' className='p-2 border border-gray-
                500 rounded-md' />
                <input type="email" placeholder='Email' className='p-2 border border-gray-
                500 rounded-md' />
                <input type="password" placeholder='Password' className='p-2 border border-gray-
                500 rounded-md' />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-
                2 px-4 rounded'>Add User</button>
            </form>
        </div>
    )
}

export default AddUser