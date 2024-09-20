import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPost(response.data);
        };
        fetchPost();
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className='bg-gray-900 text-white min-h-screen w-full flex items-center justify-center'>
            <Card className="size-[400px] text-center flex flex-col shadpw-lg bg-gray-800 border backdrop-blur-3xl">
                <CardHeader>
                    <CardTitle className="text-4xl text-white pb-16">{post.title}</CardTitle>
                    <CardDescription className="text-lg">{post.body}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default PostDetail;