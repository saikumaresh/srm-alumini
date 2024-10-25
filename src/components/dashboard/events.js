import React, { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';

const Events = () => {
  const [events, setEvents] = useState([]); // Store all events for the current user
  const [title, setTitle] = useState(''); // New event title
  const [date, setDate] = useState(''); // New event date
  const [location, setLocation] = useState(''); // New event location
  const [description, setDescription] = useState(''); // New event description
  const [editEventId, setEditEventId] = useState(null); // Event being edited
  const [userEmail, setUserEmail] = useState(''); // Store logged-in user's email

  useEffect(() => {
    fetchUserEmail();
    fetchEvents();
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

  // Fetch all events for the current user
  const fetchEvents = async () => {
    if (!userEmail) return; // Don't fetch until userEmail is available
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('email_id', userEmail) // Query only events related to the logged-in user's email
      .order('date', { ascending: false });

    if (error) console.error('Error fetching events:', error);
    else setEvents(data);
  };

  // Create a new event with the user's email_id
  const handleCreateEvent = async () => {
    const { error } = await supabase
      .from('events')
      .insert([{ title, date, location, description, email_id: userEmail }]); // Insert event with email_id

    if (error) console.error('Error creating event:', error);
    else {
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
      fetchEvents(); // Refresh events list
    }
  };

  // Edit an existing event
  const handleEditEvent = async () => {
    const { error } = await supabase
      .from('events')
      .update({ title, date, location, description })
      .eq('id', editEventId)
      .eq('email_id', userEmail); // Ensure that the logged-in user can only edit their own event

    if (error) console.error('Error updating event:', error);
    else {
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
      setEditEventId(null);
      fetchEvents(); // Refresh events list
    }
  };

  // Delete an event
  const handleDeleteEvent = async (id) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
      .eq('email_id', userEmail); // Ensure that the logged-in user can only delete their own event

    if (error) console.error('Error deleting event:', error);
    else fetchEvents(); // Refresh events list
  };

  // Load event for editing
  const handleLoadEvent = (event) => {
    setTitle(event.title);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
    setEditEventId(event.id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Events</h1>

      {/* Event Form */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editEventId ? 'Edit Event' : 'Create Event'}
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
          onClick={editEventId ? handleEditEvent : handleCreateEvent}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editEventId ? 'Update Event' : 'Create Event'}
        </button>
      </div>

      {/* Events List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Events</h2>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleLoadEvent(event)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
