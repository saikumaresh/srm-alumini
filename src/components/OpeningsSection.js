import React from 'react';

const OpeningsSection = () => {
  const jobOpenings = [
    {
      title: 'Software Engineer at Google',
      location: 'New York, USA',
      postedDate: 'October 18, 2024',
      description: 'Join our team of engineers working on cutting-edge technologies. Great benefits and opportunities for growth!',
    },
    {
      title: 'Data Scientist at Facebook',
      location: 'London, UK',
      postedDate: 'October 10, 2024',
      description: 'We are looking for data enthusiasts who love problem-solving using data. Apply now for exciting projects!',
    },
    {
      title: 'Civil Engineer at XYZ Constructions',
      location: 'Chennai, India',
      postedDate: 'September 30, 2024',
      description: 'Exciting opportunities for fresh graduates to work on sustainable building projects.',
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Job Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobOpenings.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-500 text-sm">{job.location}</p>
              <p className="text-gray-500 text-sm">{job.postedDate}</p>
              <p className="mt-4 text-gray-700">{job.description}</p>
              <a href="/openings" className="text-blue-600 hover:underline mt-4 block">Learn more</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpeningsSection;
