import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis
} from '@/components/ui/pagination';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users?page=1&pageSize=2');
                setPosts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(true);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className='text-center py-5'>
                <input
                    type="text"
                    placeholder="Search posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-3 w-1/3 border border-gray-500 rounded-lg bg-gray-500 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <ul className='px-20 pt-10'>
                {currentPosts.map(post => (
                    <li key={post.id} className="mb-4 py-4 border border-gray-700 rounded bg-gray-800">
                        <Link to={`/posts/${post.id}`} className="text-blue-400 hover:underline">
                            <span className='text-blue-400 mr-4 p-5 rounded-l bg-gray-600'>{post.id}</span>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Shadcn Pagination Component */}
            <Pagination className="fixed bottom-10 flex justify-center items-center">
                <PaginationContent className="flex space-x-2">
                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                if (currentPage > 1) {
                                    paginate(currentPage - 1);
                                }
                            }}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Previous
                        </PaginationPrevious>
                    </PaginationItem>

                    {/* Pagination Links */}
                    {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, index) => (
                        <PaginationItem key={index + 1}>
                            <PaginationLink
                                onClick={() => paginate(index + 1)}
                                isActive={currentPage === index + 1}
                                className={`text-white ${currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-400 px-4 py-2 rounded`}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Ellipsis */}
                    {filteredPosts.length > postsPerPage * 3 && (
                        <PaginationItem>
                            <PaginationEllipsis className="text-white bg-gray-700 rounded" />
                        </PaginationItem>
                    )}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => {
                                if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
                                    paginate(currentPage + 1);
                                }
                            }}
                            disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                            className={`px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 ${currentPage === Math.ceil(filteredPosts.length / postsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Next
                        </PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    );
};

export default PostList;
