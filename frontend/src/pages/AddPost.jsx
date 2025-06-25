import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './AddPost.css';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    const API_URL = import.meta.env.VITE_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !content) {
            setError('Both title and content are required');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Failed to add post');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Server error. Try again.');
        }
    };

    if (user?.role !== 'admin') {
        return <p style={{ padding: '20px' }}>Access denied. Admins only.</p>;
    }

    return (
        <div className="add-post-container">
            <h2>Add New Post</h2>
            <form onSubmit={handleSubmit} className="add-post-form">
                <input
                    type="text"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Enter post content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                />

                {error && <p className="error-text">{error}</p>}

                <div className="form-buttons">
                    <button type="submit">Publish</button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/')}>
                        Cancel
                    </button>
                </div>
            </form>

        </div>
    );
};

export default AddPost;
