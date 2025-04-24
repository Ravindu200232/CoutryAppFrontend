import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Hamburger and close icons

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold">
          CountryApp
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span>Hello, {user.username}</span>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-2 mt-4 px-2">
          {user ? (
            <>
              <span className="text-white">Hello, {user.username}</span>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
