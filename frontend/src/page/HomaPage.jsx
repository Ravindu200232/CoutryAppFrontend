import { Route, Routes, useNavigate } from "react-router-dom";
import CountryPage from "./CountryPage";
import { Home } from "./Home";
import Navbar from "../components/Navbar";

export function HomePage() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  console.log(storedUser, "user");

  if (!storedUser) {
    return (
      <div className="min-h-screen flex bg-gradient-to-r from-green-100 to-white overflow-hidden">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white md:rounded-l-3xl shadow-xl">
          <div className="max-w-md w-full space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Please Login First
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
        <div className="hidden md:grid md:w-1/2 grid-cols-3 grid-rows-4 gap-2 p-4 h-screen overflow-hidden">
          <img
            src="/1.jpg"
            alt="img1"
            className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg"
          />
          <img
            src="/2.jpg"
            alt="img2"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="/3.jpg"
            alt="img3"
            className="col-span-1 row-span-2 w-full h-full object-cover rounded-lg"
          />
          <img
            src="/4.jpg"
            alt="img4"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="/5.jpg"
            alt="img5"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="/6.jpg"
            alt="img6"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="/7.jpg"
            alt="img7"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="/8.jpg"
            alt="img8"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>

        {/* Add padding to prevent content hiding behind the navbar */}
        <div className="pt-16">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/country/:code/*" element={<CountryPage />} />
          </Routes>
        </div>
      </div>
    );
  }
}
