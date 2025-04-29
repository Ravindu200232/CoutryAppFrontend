import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Hamburger and close icons
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setMenuOpen(false);
  };

  // Load Google Translate script dynamically
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,si,ta,fr,es,de,zh-CN,hi,ja,ko,ar", // you can add more languages here
          layout:
            window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <nav className="bg-primary text-white p-4 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <DotLottieReact
          className="w-[100px]"
          src="https://lottie.host/dde6c4a5-769f-4090-b9c2-89d40279ba73/Z4Lq47T21F.lottie"
          loop
          autoplay
        />
        <Link to="/" className="text-2xl  flex-row font-bold w-[100px]">
          <div>WorldWay</div>
        </Link>

        {/* Google Translate Dropdown */}
        <div
          id="google_translate_element"
          className="hidden md:block ml-4"
        ></div>

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
          <div id="google_translate_element_mobile" className="mb-2"></div>

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
