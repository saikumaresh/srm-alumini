import React from 'react';

const EventsSection = () => {
  const events = [
    {
      title: 'Alumni Meet 2024',
      date: 'December 10, 2024',
      location: 'Chennai, India',
      description: 'Join us for the annual alumni meet to reconnect with old friends, faculty, and mentors.',
    },
    {
      title: 'Tech Talk with Industry Experts',
      date: 'November 5, 2024',
      location: 'Virtual Event',
      description: 'An exclusive session with industry leaders discussing the latest trends in technology.',
    },
    {
      title: 'Career Workshop for Recent Graduates',
      date: 'October 25, 2024',
      location: 'New York, USA',
      description: 'A workshop designed to help recent graduates build successful career paths with alumni mentors.',
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-500">{event.date}</p>
              <p className="text-gray-500">{event.location}</p>
              <p className="mt-4 text-gray-700">{event.description}</p>
              <a href="/events" className="text-blue-600 hover:underline mt-4 block">Learn more</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
