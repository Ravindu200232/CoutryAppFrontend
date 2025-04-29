import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { AiOutlineLogin } from "react-icons/ai";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    setMenuOpen(false);
  };

  // Google Translate setup
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
          includedLanguages: "en,si,ta,fr,es,de,zh-CN,hi,ja,ko,ar",
          layout:
            window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-primary text-white p-4 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & App Name */}
        <div className="flex items-center space-x-2">
          <DotLottieReact
            className="w-[60px]"
            src="https://lottie.host/dde6c4a5-769f-4090-b9c2-89d40279ba73/Z4Lq47T21F.lottie"
            loop
            autoplay
          />
          <Link to="/" className="text-2xl font-bold">
            WorldWay
          </Link>
        </div>

        {/* Google Translate (Desktop) */}
        <div
          id="google_translate_element"
          className="hidden md:block ml-4"
        ></div>

        {/* Right Side: Login/Profile & Mobile Toggle */}
        <div className="flex items-center space-x-4 text-white">
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="hidden md:inline text-sm">
                Hello, {user.firstName || user.username}
              </span>
              <Link to="/profile">
                <img
                  src={user.image || "/default-profile.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-white"
                />
              </Link>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-300 text-[26px]">
              <AiOutlineLogin />
            </Link>
          )}

          {/* Mobile Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? (
              <HiX className="text-[28px]" />
            ) : (
              <HiMenuAlt3 className="text-[28px]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 mt-2 gap-3">
          <div id="google_translate_element_mobile" className="mb-2"></div>
          {user ? (
            <>
              <span>Hello, {user.username || user.username}</span>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition text-sm"
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
