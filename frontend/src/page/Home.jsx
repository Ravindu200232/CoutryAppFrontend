import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import { getAllCountries } from "../services/api";
import "../css/home.css";
import LanguageFilter from "../components/LanguageFilter ";

export function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, []);

  // Extract available languages dynamically
  const availableLanguages = Array.from(
    new Set(
      countries.flatMap((c) => c.languages.map((lang) => lang.name))
    )
  ).sort();

  const filteredCountries = countries.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "" || c.region === selectedRegion;
    const matchesLanguage =
      selectedLanguage === "" || c.languages.some((lang) => lang.name === selectedLanguage);

    return matchesSearch && matchesRegion && matchesLanguage;
  });

  return (
    <div className="bg-picture min-h-screen relative">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 px-4 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 drop-shadow-md">
          Explore Countries of the World 🌍
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <RegionFilter selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
          <LanguageFilter
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            languages={availableLanguages}
          />
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