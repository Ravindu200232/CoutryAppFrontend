import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import LanguageFilter from "../components/LanguageFilter ";
import { getAllCountries } from "../services/api";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import "../css/home.css";

export function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      setCountries(data);
      setLoading(true);
    };
    fetchCountries();
  }, []);

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
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 drop-shadow-md typing-animation">
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

        {!loading ? (
          <div className="text-center text-white text-[200px]">
            <DotLottieReact
              src="https://lottie.host/29d4ed68-665b-4da2-b4ff-f937fadd0e6c/2OTL4ieu6c.lottie"
              loop
              autoplay
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
