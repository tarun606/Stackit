// client/src/RegisterPage.js
import React, { useState } from 'react';

// RegisterPage component receives setCurrentPage as a prop to navigate back to login
function RegisterPage({ setCurrentPage }) {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State for messages displayed to the user (success/error)
  const [message, setMessage] = useState('');
  // State to track if the registration was successful
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear previous messages
    setMessage('');
    setIsSuccess(false);

    // Basic validation: Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      setIsSuccess(false);
      return; // Stop the function if passwords don't match
    }

    // Basic validation: Check if fields are not empty
    if (!email || !password || !confirmPassword) {
      setMessage('Please fill in all fields.');
      setIsSuccess(false);
      return;
    }

    // Simulate a successful registration (in a real app, you'd send this data to a backend)
    console.log('Registration data:', { email, password });
    setMessage('Registration successful! Welcome.');
    setIsSuccess(true);

    // Optionally, clear the form after successful registration
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-200 ease-in-out placeholder-gray-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-200 ease-in-out placeholder-gray-400"
              placeholder="Create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-200 ease-in-out placeholder-gray-400"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Message Display Area */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                isSuccess ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
              } flex items-center justify-center`}
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Register
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="mt-8 text-center text-base text-gray-700">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')} // Navigate back to login
            className="font-bold text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
