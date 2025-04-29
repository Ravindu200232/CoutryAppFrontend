import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import LanguageFilter from "../components/LanguageFilter ";
import { getAllCountries } from "../services/api";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import "../css/home.css";

export function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [favoriteCodes, setFavoriteCodes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      setCountries(data);
      setLoading(true);
    };

    const fetchFavorites = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/favorite/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFavoriteCodes(res.data);
    };

    fetchCountries();
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (code) => {
    const isFav = favoriteCodes.includes(code);
    const token = localStorage.getItem("token");
    if (isFav) {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/favorite/remove`,
        { countryCode: code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavoriteCodes((prev) => prev.filter((c) => c !== code));
    } else {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/favorite/add`,
        { countryCode: code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavoriteCodes((prev) => [...prev, code]);
    }
  };

  const availableLanguages = Array.from(
    new Set(countries.flatMap((c) => c.languages.map((l) => l.name)))
  );

  const filteredCountries = countries.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || c.region === selectedRegion;
    const matchesLanguage =
      !selectedLanguage || c.languages.some((l) => l.name === selectedLanguage);
    const matchesFavorite =
      !showFavorites || favoriteCodes.includes(c.alpha3Code);
    return matchesSearch && matchesRegion && matchesLanguage && matchesFavorite;
  });

  return (
    <div className="bg-picture bg-cover bg-center min-h-screen p-6 flex flex-col items-center justify-center">
       <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 drop-shadow-md typing-animation">
          Explore Countries of the World 🌍
        </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <RegionFilter
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
        <LanguageFilter
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          languages={availableLanguages}
        />
        <button
          className="bg-secondary font-semibold text- px-4 py-2 rounded"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {!loading ? (
        <DotLottieReact
          src="https://lottie.host/29d4ed68-665b-4da2-b4ff-f937fadd0e6c/2OTL4ieu6c.lottie"
          loop
          autoplay
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.alpha3Code}
              country={country}
              isFavorite={favoriteCodes.includes(country.alpha3Code)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
