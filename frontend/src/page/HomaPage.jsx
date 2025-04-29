import { Route, Routes } from "react-router-dom";
import CountryPage from "./CountryPage";
import { Home } from "./Home";
import Navbar from "../components/Navbar";

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Add padding to prevent content hiding behind the navbar */}
      <div className="pt-16">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/country/:code" element={<CountryPage />} />
        </Routes>
      </div>
    </div>
  );
}
