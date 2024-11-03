import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Blogs from '../components/dashboard/blog';
import Events from '../components/dashboard/events';
import JobOpenings from '../components/dashboard/jobOpenings';
import Notifications from '../components/dashboard/notifications';
import Chat from '../components/chat/Chat';

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
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-600 text-white flex flex-col shadow-lg">
        <h1 className="text-3xl font-bold p-6">Dashboard</h1>
  
        <nav className="flex-1 p-6">
          <ul>
            <li className="mb-6">
              <button
                onClick={() => setSelectedComponent('blogs')}
                className="hover:underline hover:text-teal-200"
              >
                Blogs
              </button>
            </li>
            <li className="mb-6">
              <button
                onClick={() => setSelectedComponent('events')}
                className="hover:underline hover:text-teal-200"
              >
                Events
              </button>
            </li>
            <li className="mb-6">
              <button
                onClick={() => setSelectedComponent('jobOpenings')}
                className="hover:underline hover:text-teal-200"
              >
                Job Openings
              </button>
            </li>
            <li className="mb-6">
              <button
                onClick={() => setSelectedComponent('notifications')}
                className="hover:underline hover:text-teal-200"
              >
                Notifications
              </button>
            </li>
            <li className="mb-6">
              <button
                onClick={() => setSelectedComponent('messaging')}
                className="hover:underline hover:text-teal-200"
              >
                Chat Now
              </button>
            </li>
            <li className="mt-auto mb-4">
              <button
                onClick={handleLogout}
                className="text-sm font-semibold hover:text-teal-200"
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>
  
      {/* Main Content */}
      <main className="flex-1 p-10 bg-white rounded-tl-3xl shadow-lg">
        <h2 className="text-2xl font-extrabold mb-8 text-gray-800">Welcome, {tables[0]?.name}</h2>
        {/* Render selected component based on the selected option */}
        {selectedComponent === 'blogs' && <Blogs />}
        {selectedComponent === 'events' && <Events />}
        {selectedComponent === 'jobOpenings' && <JobOpenings />}
        {selectedComponent === 'notifications' && <Notifications />}
        {selectedComponent === 'messaging' && <Chat />}
      </main>
    </div>
  );
  
};

export default Dashboard;
