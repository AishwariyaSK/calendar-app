import React, { useState, useEffect, useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext.jsx';


const Events = () => {
  const { curDate, eventData, setEventData} = useContext(CalendarContext);
  const [showForm, setShowForm] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: curDate.toLocaleDateString(), 
    time: curDate.toLocaleTimeString(),
    description: ''
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    // For now we just log it—replace with your data update logic
    console.log('New Event:', newEvent);
    setShowForm(false);
    setNewEvent({ title: '', date: '', time: '', description: '' });
  };

  const handleEditEvent = (event) => {

  }
  const handleDeleteEvent = (index) => {

  }

  

  useEffect(() => {
    setFilteredEvents(eventData.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === curDate.toDateString();
    }));
  }, [eventData, curDate]);

  return (
    <div className='m-5'>
      <div className='flex gap-5'>
        <h1 className="text-3xl font-bold">Events</h1>
        <button
          onClick={() => setShowForm(true)}
          className='bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer'
        >
          ➕ Add Event
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Event</h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newEvent.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newEvent.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-600 px-4 py-2 rounded hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className='bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer'
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {filteredEvents.length === 0 ? (
  <h2 className="m-10 text-blue-600 italic font-semibold ">No events yet</h2>
) : (
  <div className="m-5 grid gap-4 overflow-y-auto max-h-[70vh]">
    {filteredEvents.map((event, index) => {
      const date = new Date(event.date);
      const [hours, minutes] = event.time.split(":");
      date.setHours(parseInt(hours), parseInt(minutes));

      return (
        <div
          key={index}
          className=" hover:border-l-4 border-blue-700 bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-99  transform transition-transform transition-shadow duration-300"
        >
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-blue-700">{event.title}</h2>
            <div className="space-x-2">
              <button
                onClick={() => handleEditEvent(event)}
                className="text-sm text-blue-600 border border-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(index)}
                className="text-sm text-red-600 border border-red-700 px-3 py-1 rounded hover:bg-red-100 transition"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1 font-semibold">
            Date: <span className="text-gray-600">{date.toLocaleDateString()}</span>
          </p>
          <p className="text-sm text-gray-500 mb-2 font-semibold">
            Time: <span className="text-gray-600">{date.toLocaleTimeString()}</span>
          </p>
          <p className="text-gray-700">{event.description}</p>
        </div>
      );
    })}
  </div>
)}
    </div>
  );
};

export default Events;