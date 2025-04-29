import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Login } from "./page/Login";
import { Signup } from "./page/Signup";
import { HomePage } from "./page/HomaPage";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from "./page/verifyEmail";

import "./css/home.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="93119756985-3cvvkvdu7epn3h2k0i53pg5i17o9b3ji.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes path="/">
          <Route path="/*" element={<HomePage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/signup/*" element={<Signup />} />
        
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
