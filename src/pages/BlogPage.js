import React from 'react';

const BlogPage = () => {
  const blogPosts = [
    {
      title: 'Alumni Success Stories: From Campus to Career',
      date: 'October 18, 2024',
      content: 'Full content of the blog post goes here...',
    },
    {
      title: 'How to Stay Connected with Your Alumni Network',
      date: 'October 10, 2024',
      content: 'Full content of the blog post goes here...',
    },
    {
      title: 'Upcoming Alumni Meet 2024: Register Now!',
      date: 'September 30, 2024',
      content: 'Full content of the blog post goes here...',
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p className="mt-4 text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
