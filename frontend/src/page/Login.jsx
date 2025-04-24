import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      setError('No registered user found. Please sign up first.');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (formData.email === userData.email && formData.password === userData.password) {
      setError('');
      toast.success("Login successfully")
      navigate('/home');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section (Login Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Not a member? <a href="#" className="text-indigo-600 hover:underline">Start a 14 day free trial</a>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
            >
              Sign in
            </button>
          </form>
          <div className="relative text-center text-sm text-gray-500">
            <span className="px-2 bg-white">Or continue with</span>
          </div>
          <div className="flex gap-4 justify-center">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Google
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 " onClick={()=>{
                navigate("/signup")
            }}>
              
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <img
          src="/blackground.jpg" // Replace with your actual image path or import
          alt="Login visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
