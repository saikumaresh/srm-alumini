import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Blogs from '../components/dashboard/blog';
import Events from '../components/dashboard/events';
import JobOpenings from '../components/dashboard/jobOpenings';
import Notifications from '../components/dashboard/notifications';

const Dashboard = () => {
  const [user, setUser] = useState(null); // Store the authenticated user
  const [tables, setTables] = useState([]); // To fetch and display any relevant data
  const [selectedComponent, setSelectedComponent] = useState('notifications'); // Set Notifications as default
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/');
      }
    };

    checkUser();
  }, [navigate]);

  // Fetch data from a table (example: fetching profile details)
  useEffect(() => {
    const fetchTables = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id);

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setTables(data);
        }
      }
    };

    fetchTables();
  }, [user]);

  // Handle user logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-4">Dashboard</h1>

        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setSelectedComponent('blogs')}
                className="hover:underline"
              >
                Blogs
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setSelectedComponent('events')}
                className="hover:underline"
              >
                Events
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setSelectedComponent('jobOpenings')}
                className="hover:underline"
              >
                Job Openings
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setSelectedComponent('notifications')}
                className="hover:underline"
              >
                Notifications
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={handleLogout}
                className="mb-4"
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-xl font-bold mb-6">Welcome, {user?.email}</h2>
        {/* Render selected component based on the selected option */}
        {selectedComponent === 'blogs' && <Blogs />}
        {selectedComponent === 'events' && <Events />}
        {selectedComponent === 'jobOpenings' && <JobOpenings />}
        {selectedComponent === 'notifications' && <Notifications />}
      </main>
    </div>
  );
};

export default Dashboard;
