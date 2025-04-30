import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Google Login logic
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
          accessToken: res.access_token,
        })
        .then((res) => {
          toast.success("Login successful");
          const user = res.data.user;
          localStorage.setItem("token", res.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: user._id,
              email: user.email,
              role: user.role,
              image: user.image,
            })
          );
          if (user.role === "customer") {
            navigate("/");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          toast.error("Google login failed");
        });
    },
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .post(`${backendUrl}/api/users/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.data.message === "User is blocked") {
          toast.error(res.data.message);
          return;
        }

        toast.success(res.data.message);
        const user = res.data.user;

        localStorage.setItem("token", res.data.token);
        console.log("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user._id,
            email: user.email,
            role: user.role,
            username: user.username,
            image: user.image,
          })
        );

        if (!user.emailVerified) {
          toast.error("Please verify your email first");
          navigate("/verify-email");
          return;
        }

        if (user.role === "customer") {
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Login failed");
      });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-green-100 to-white overflow-hidden">
      {/* Left Grid Section */}
      <div className="hidden md:grid md:w-1/2 grid-cols-3 grid-rows-4 gap-2 p-4 h-screen overflow-hidden">
        <img
          src="/1.jpg"
          alt="Office workspace"
          className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg"
        />
        <img
          src="/2.jpg"
          alt="Collaboration"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="/3.jpg"
          alt="Team discussion"
          className="col-span-1 row-span-2 w-full h-full object-cover rounded-lg"
        />
        <img
          src="/4.jpg"
          alt="Desk setup"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="/5.jpg"
          alt="Brainstorm session"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="/6.jpg"
          alt="Meeting room"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="/7.jpg"
          alt="Modern office"
          className="w-full h-full object-cover rounded-lg"
        />
        <img
          src="/8.jpg"
          alt="Teamwork in action"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white md:rounded-l-3xl shadow-xl">
        <img src="/earth.png" className="w-[100px] mb-4"></img>
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Sign in to WorldWay
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Welcome to WorldWay, please enter your login details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">or</div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={googleLogin}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 w-full"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 w-full"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
