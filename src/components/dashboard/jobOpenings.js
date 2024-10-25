import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';

const JobOpenings = () => {
  const [jobs, setJobs] = useState([]); // Store all job openings for the current user
  const [title, setTitle] = useState(''); // New job title
  const [postedDate, setPostedDate] = useState(''); // New job posted date
  const [location, setLocation] = useState(''); // New job location
  const [description, setDescription] = useState(''); // New job description
  const [editJobId, setEditJobId] = useState(null); // Job being edited
  const [userEmail, setUserEmail] = useState(''); // Store logged-in user's email

  useEffect(() => {
    fetchUserEmail();
    fetchJobs();
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

  // Fetch all job openings for the current user
  const fetchJobs = async () => {
    if (!userEmail) return; // Don't fetch until userEmail is available
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('email_id', userEmail) // Query only job openings related to the logged-in user's email
      .order('postedDate', { ascending: false });

    if (error) console.error('Error fetching job openings:', error);
    else setJobs(data);
  };

  // Create a new job opening with the user's email_id
  const handleCreateJob = async () => {
    const { error } = await supabase
      .from('job_openings')
      .insert([{ title, postedDate, location, description, email_id: userEmail }]); // Insert job with email_id

    if (error) console.error('Error creating job opening:', error);
    else {
      setTitle('');
      setPostedDate('');
      setLocation('');
      setDescription('');
      fetchJobs(); // Refresh job list
    }
  };

  // Edit an existing job opening
  const handleEditJob = async () => {
    const { error } = await supabase
      .from('job_openings')
      .update({ title, postedDate, location, description })
      .eq('id', editJobId)
      .eq('email_id', userEmail); // Ensure that the logged-in user can only edit their own job opening

    if (error) console.error('Error updating job opening:', error);
    else {
      setTitle('');
      setPostedDate('');
      setLocation('');
      setDescription('');
      setEditJobId(null);
      fetchJobs(); // Refresh job list
    }
  };

  // Delete a job opening
  const handleDeleteJob = async (id) => {
    const { error } = await supabase
      .from('job_openings')
      .delete()
      .eq('id', id)
      .eq('email_id', userEmail); // Ensure that the logged-in user can only delete their own job opening

    if (error) console.error('Error deleting job opening:', error);
    else fetchJobs(); // Refresh job list
  };

  // Load job for editing
  const handleLoadJob = (job) => {
    setTitle(job.title);
    setPostedDate(new Date(job.postedDate).toISOString().split('T')[0]); // Convert date to YYYY-MM-DD
    setLocation(job.location);
    setDescription(job.description);
    setEditJobId(job.id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Job Openings</h1>

      {/* Job Form */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editJobId ? 'Edit Job' : 'Create Job'}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={postedDate}
          onChange={(e) => setPostedDate(e.target.value)}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={editJobId ? handleEditJob : handleCreateJob}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editJobId ? 'Update Job' : 'Create Job'}
        </button>
      </div>

      {/* Jobs List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Job Openings</h2>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p>{new Date(job.postedDate).toLocaleDateString()}</p>
              <p>{job.location}</p>
              <p>{job.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleLoadJob(job)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No job openings found.</p>
        )}
      </div>
    </div>
  );
};

export default JobOpenings;
