import React from 'react';

const BlogSection = () => {
  const blogPosts = [
    {
      title: 'Alumni Success Stories: From Campus to Career',
      date: 'October 18, 2024',
      excerpt: 'Discover how our alumni have achieved incredible success after graduating from Easwari Engineering College...',
    },
    {
      title: 'How to Stay Connected with Your Alumni Network',
      date: 'October 10, 2024',
      excerpt: 'Staying in touch with fellow alumni can be one of the most valuable aspects of your professional career...',
    },
    {
      title: 'Upcoming Alumni Meet 2024: Register Now!',
      date: 'September 30, 2024',
      excerpt: 'We’re thrilled to announce the upcoming Alumni Meet in 2024. Join us for a day full of networking, learning, and fun...',
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-500 text-sm">{post.date}</p>
              <p className="mt-4 text-gray-700">{post.excerpt}</p>
              <a href="/blog" className="text-blue-600 hover:underline mt-4 block">Read more</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
