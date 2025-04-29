import React, { useState } from 'react';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!formData.repassword) newErrors.repassword = 'Please confirm your password';
    else if (formData.password !== formData.repassword) newErrors.repassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success("User Registration Successfully");
      navigate("/login");
      setFormData({ username: '', email: '', password: '', repassword: '' });
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-green-100 to-white overflow-hidden">
      
      {/* Left Image Grid */}
      <div className="hidden md:grid md:w-1/2 grid-cols-3 grid-rows-4 gap-2 p-4 h-screen overflow-hidden">
        <img src="/1.jpg" alt="img1" className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg" />
        <img src="/2.jpg" alt="img2" className="w-full h-full object-cover rounded-lg" />
        <img src="/3.jpg" alt="img3" className="col-span-1 row-span-2 w-full h-full object-cover rounded-lg" />
        <img src="/4.jpg" alt="img4" className="w-full h-full object-cover rounded-lg" />
        <img src="/5.jpg" alt="img5" className="w-full h-full object-cover rounded-lg" />
        <img src="/6.jpg" alt="img6" className="w-full h-full object-cover rounded-lg" />
        <img src="/7.jpg" alt="img7" className="w-full h-full object-cover rounded-lg" />
        <img src="/8.jpg" alt="img8" className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Right Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white md:rounded-l-3xl shadow-xl">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Already registered? <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="repassword"
                value={formData.repassword}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.repassword && <p className="text-red-500 text-sm">{errors.repassword}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
            >
              Sign up
            </button>
          </form>
          <div className="text-center text-sm text-gray-500">or</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 w-full">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 w-full" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
