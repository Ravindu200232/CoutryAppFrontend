import { Route, Routes } from "react-router-dom";
import CountryPage from "./CountryPage";
import { Home } from "./Home";
import Navbar from "../components/Navbar";

export function HomePage(){

    return(
        <div>
            <Navbar/>
        <Routes path="/*">
          <Route path="/home" element={<Home />} />
          <Route path="/country/:code" element={<CountryPage />} />
          
        </Routes>
        </div>
    )
}