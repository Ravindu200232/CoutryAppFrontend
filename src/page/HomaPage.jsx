import { Route, Routes, useNavigate } from "react-router-dom";
import CountryPage from "./CountryPage";
import { Home } from "./Home";
import Navbar from "../components/Navbar";
import "../css/home.css";
import { Profile } from "./Profile";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { Login } from "./Login";
import Footer from "../components/footer";
import { DarkMode } from "../components/darkMode";

export function HomePage() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "user data");
        setAuth(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, [token]);
  console.log(auth, "auth data");

  if (!auth) {
    return (
      <div>
        <Login/>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col ">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        {/* Add padding to prevent content hiding behind the navbar */}
        <div className="pt-16 bg-picture">
          <Routes>
          <DarkMode/>
            <Route path="/*" element={<Home />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/country/:code/*" element={<CountryPage />} />
          </Routes>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    );
  }
}
