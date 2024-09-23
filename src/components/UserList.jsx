import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(totalRecords / pageSize)

    const bearerToken = localStorage.getItem("token")

    useEffect(() => {
        const fetchUsers = async (page) => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/users?page=${page}&pageSize=${pageSize}`, {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`
                    }
                });
                setUsers(response.data.users);
                setTotalRecords(response.data.total_records);
                setCurrentPage(response.data.current_page);
            } catch (error) {
                console.log('Error fetching users:', error.response);
                console.log("Error code : ", error.response.status)
                console.log("Error message : ", error.response.data)
            } finally {
                setLoading(false);
            }
        };
        fetchUsers(currentPage);
    }, [currentPage, pageSize]);

    const filteredUsers = users?.filter(user =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
    );

    return (
        <div className="bg-gray-900 min-h-screen text-white p-10">
            <div className="flex justify-between items-center mb-4">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search users"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 rounded bg-gray-700 text-white"
                    />
                    <button className="ml-2 px-4 py-2 rounded bg-blue-500 text-white">Search</button>
                </div>

                <div className='flex gap-5'>
                    {/* Add New User Button */}
                    <Link to="/add-user">
                        <button className="px-4 py-2 bg-blue-500 border border-blue-500 rounded text-white hover:bg-transparent">Add new user</button>
                    </Link>

                    {/* Admin Login Button */}
                    <Link to="/admin-login">
                        <button className="px-4 py-2 bg-transparent border border-blue-500 rounded text-white hover:bg-blue-500">Admin Login</button>
                    </Link>
                </div>

            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-lg">
                <table className="border-separate border-spacing-2 border w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="text-left border bg-gray-700">
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Created At</th>
                            <th className="px-4 py-2 border">Employee Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">Loading...</td>
                            </tr>
                        ) : (
                            filteredUsers?.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-700 border">
                                    <td className="px-4 py-2 border">{user.email}</td>
                                    <td className="px-4 py-2 border">{`${user.first_name} ${user.last_name}`}</td>
                                    <td className="px-4 py-2 border">{user.phone}</td>
                                    <td className="px-4 py-2 border">{user.created_at}</td>
                                    <td className="px-4 py-2 border">{user._id}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <span className=''>
                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} records
                </span>

                <Pagination className="w-fit">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage(Math.max(currentPage - 1, 1))
                                    }
                                }}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 bg-gray-700 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Previous
                            </PaginationPrevious>
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index + 1}>
                                <PaginationLink
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => {
                                    if (currentPage < totalPages) {
                                        setCurrentPage(Math.min(currentPage + 1, totalPages))
                                    }
                                }
                                }
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 bg-gray-700 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next
                            </PaginationNext>
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>

                {/* Page size selection */}
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(parseInt(e.target.value))}
                    className="bg-gray-700 text-white p-2 rounded"
                >
                    <option value={5}>Show 5</option>
                    <option value={10}>Show 10</option>
                    <option value={20}>Show 20</option>
                </select>
            </div>
        </div >
    );
};

export default UserList;
