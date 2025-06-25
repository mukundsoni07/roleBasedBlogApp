import Post from '../models/postModel.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'fullName role');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};

export const addPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        const newPost = await Post.create({
            title,
            content,
            author: req.user._id,
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post' });
    }
};
