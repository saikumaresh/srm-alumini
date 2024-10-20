import React from 'react';

const OpeningsPage = () => {
  const jobOpenings = [
    {
      title: 'Software Engineer at Google',
      location: 'New York, USA',
      postedDate: 'October 18, 2024',
      description: 'Join our team of engineers working on cutting-edge technologies. Great benefits and opportunities for growth! We are looking for a Software Engineer to join our dynamic team. You will work with advanced technologies like AI, Machine Learning, and Cloud Computing.',
    },
    {
      title: 'Data Scientist at Facebook',
      location: 'London, UK',
      postedDate: 'October 10, 2024',
      description: 'We are looking for data enthusiasts who love problem-solving using data. As a Data Scientist, you will analyze complex datasets, develop predictive models, and work with machine learning algorithms to drive innovation.',
    },
    {
      title: 'Civil Engineer at XYZ Constructions',
      location: 'Chennai, India',
      postedDate: 'September 30, 2024',
      description: 'Exciting opportunities for fresh graduates to work on sustainable building projects. As a Civil Engineer, you will design and manage large-scale construction projects with a focus on sustainability and modern building technologies.',
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Current Job Openings</h1>
      <div className="space-y-8">
        {jobOpenings.map((job, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-500 text-sm">{job.location} &bull; {job.postedDate}</p>
            <p className="mt-4 text-gray-700">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningsPage;
