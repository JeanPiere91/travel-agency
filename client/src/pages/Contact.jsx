import React, { useState } from 'react';

function Contact() {
  const [contactState, setContactState] = useState({ name: '', email: '', message: '' });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    console.log('Contact Form Values:', contactState);
    setContactState({ name: '', email: '', message: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactState({
        ...contactState,
        [name]: value,
    });
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-md'>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave a Message if you have any Questions</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              placeholder="Please enter your name"
              name="name"
              type="text"
              id="name"
              value={contactState.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              placeholder="Please enter your email"
              name="email"
              type="email"
              id="email"
              value={contactState.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              placeholder="Type your message here"
              name="message"
              id="message"
              rows="4"
              value={contactState.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;