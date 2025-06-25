import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/api/posts`);
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error('Failed to fetch posts:', err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {

        try {
            const res = await fetch(`${API_URL}/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (!res.ok) {
                const error = await res.json();
                console.error('Failed to delete:', error.message);
                return;
            }

            setPosts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const handleAddPost = () => {
        navigate('/add-post');
    };

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Blog Posts</h1>
                {user?.role === 'admin' && (
                    <button className="add-post-button" onClick={handleAddPost}>
                        Add Post
                    </button>
                )}
            </div>

            <div className="posts-list">
                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="post-card">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p className="post-meta">
                                By: {post.author?.fullName || 'Unknown'} |{' '}
                                {new Date(post.createdAt).toLocaleString()}
                            </p>
                            {user?.role === 'admin' && (
                                <button
                                    className="delete-post-button"
                                    onClick={() => handleDelete(post._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
