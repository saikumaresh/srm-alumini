import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // Store all blogs for the current user
  const [title, setTitle] = useState(''); // New blog title
  const [excerpt, setExcerpt] = useState(''); // New blog excerpt
  const [content, setContent] = useState(''); // New blog content
  const [editBlogId, setEditBlogId] = useState(null); // Blog being edited
  const [userEmail, setUserEmail] = useState(''); // Store logged-in user's email

  useEffect(() => {
    fetchUserEmail();
    fetchBlogs();
  }, [userEmail]);

  // Fetch the logged-in user's email
  const fetchUserEmail = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error fetching user session:', error);
    } else if (session?.user) {
      setUserEmail(session.user.email); // Set user email from session
    }
  };

  // Fetch all blogs for the current user
  const fetchBlogs = async () => {
    if (!userEmail) return; // Don't fetch until userEmail is available
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('email_id', userEmail) // Query only blogs related to the logged-in user's email
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching blogs:', error);
    else setBlogs(data);
  };

  // Create a new blog with the user's email_id
  const handleCreateBlog = async () => {
    const { error } = await supabase
      .from('blogs')
      .insert([{ title, excerpt, content, email_id: userEmail }]); // Insert blog with email_id

    if (error) console.error('Error creating blog:', error);
    else {
      setTitle('');
      setExcerpt('');
      setContent('');
      fetchBlogs(); // Refresh blog list
    }
  };

  // Edit an existing blog
  const handleEditBlog = async () => {
    const { error } = await supabase
      .from('blogs')
      .update({ title, excerpt, content })
      .eq('id', editBlogId)
      .eq('email_id', userEmail); // Ensure that the logged-in user can only edit their own blog

    if (error) console.error('Error updating blog:', error);
    else {
      setTitle('');
      setExcerpt('');
      setContent('');
      setEditBlogId(null);
      fetchBlogs(); // Refresh blog list
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (id) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)
      .eq('email_id', userEmail); // Ensure that the logged-in user can only delete their own blog

    if (error) console.error('Error deleting blog:', error);
    else fetchBlogs(); // Refresh blog list
  };

  // Load blog for editing
  const handleLoadBlog = (blog) => {
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setEditBlogId(blog.id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>

      {/* Blog Form */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editBlogId ? 'Edit Blog' : 'Create Blog'}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={editBlogId ? handleEditBlog : handleCreateBlog}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editBlogId ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>

      {/* Blog List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Blogs</h2>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-bold">{blog.title}</h3>
              <p>{blog.excerpt}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleLoadBlog(blog)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
