import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const JoinWaitlistModal = ({ isOpen, onClose }) => {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_xqnu4nj', // Replace with your actual EmailJS service ID
        'template_bgel5qx', // Replace with your actual EmailJS template ID
        form.current,
        'Hx5X5TA1rB6B48JnD' // Replace with your actual EmailJS public key
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setIsSubmitted(true); // Trigger success animation
        },
        (error) => {
          console.log('Email sending failed:', error.text);
        }
      );
  };

  if (!isOpen) return null; // If modal is not open, return nothing.

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Show success checkmark if form is submitted */}
        {isSubmitted ? (
          <div className="flex flex-col items-center">
            <div className="checkmark-container">
              <div className="checkmark draw"></div>
            </div>
            <p className="text-green-500 text-lg mt-4">Success! You've joined the waitlist.</p>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Join the Waitlist</h2>
            <p className="mb-6 text-gray-600">
              Be the first to know when we launch! Sign up with your email below.
            </p>
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  What degree are you planning to apply to?
                </label>
                <select
                  name="user_degree"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select degree</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Which course are you planning to pursue?
                </label>
                <input
                  type="text"
                  name="user_course"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter the course name"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinWaitlistModal;
