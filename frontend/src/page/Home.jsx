import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import { getAllCountries } from "../services/api";
import "../css/home.css";

export function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === "" || c.region === selectedRegion)
  );

  return (
    <div className="bg-picture min-h-screen relative">
      {/* Dark Overlay */}
      <div className="absolute inset-0  bg-opacity-50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 px-4 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 drop-shadow-md">
          Explore Countries of the World 🌍
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}
