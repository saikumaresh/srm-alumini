import React from 'react';

const EventsPage = () => {
  const events = [
    {
      title: 'Alumni Meet 2024',
      date: 'December 10, 2024',
      location: 'Chennai, India',
      description: 'Join us for the annual alumni meet to reconnect with old friends, faculty, and mentors. The event includes a formal dinner, keynote speeches, and networking opportunities.',
    },
    {
      title: 'Tech Talk with Industry Experts',
      date: 'November 5, 2024',
      location: 'Virtual Event',
      description: 'An exclusive session with industry leaders discussing the latest trends in technology. Attendees will have the opportunity to ask questions and network with experts.',
    },
    {
      title: 'Career Workshop for Recent Graduates',
      date: 'October 25, 2024',
      location: 'New York, USA',
      description: 'A workshop designed to help recent graduates build successful career paths with guidance from alumni mentors. The event will include resume reviews, mock interviews, and networking sessions.',
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Upcoming Events</h1>
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-500">{event.date}</p>
            <p className="text-gray-500">{event.location}</p>
            <p className="mt-4 text-gray-700">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
