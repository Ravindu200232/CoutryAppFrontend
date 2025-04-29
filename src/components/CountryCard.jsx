import React from "react";
import { Link } from "react-router-dom";
import { Globe2, Users, Landmark, Heart } from "lucide-react";

const CountryCard = ({ country, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking favorite
    onToggleFavorite(country.alpha3Code);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden group">
      <Link to={`/country/${country.alpha3Code}`} className="block p-4">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-full h-40 object-cover rounded-xl mb-4 border border-white/20"
          loading="lazy"
        />
        <h2 className="text-xl font-bold mb-2 text-white truncate">
          {country.name}
        </h2>
        <div className="text-white text-sm space-y-1">
          <p className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-indigo-400" />
            <span>Capital:</span> {country.capital || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-green-400" />
            <span>Region:</span> {country.region}
          </p>
          <p className="flex items-center gap-2">
            <Users className="w-4 h-4 text-yellow-400" />
            <span>Population:</span> {country.population.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-2 flex justify-end">
        <button
          onClick={handleFavoriteClick}
          className={`flex items-center gap-1 text-sm font-medium transition-colors ${
            isFavorite ? "text-red-500" : "text-white"
          } hover:text-red-600`}
        >
          <Heart className={`w-5 h-5 transition-transform duration-200 ${isFavorite ? "fill-red-500" : "fill-none"} group-hover:scale-110`} />
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
};

export default CountryCard;
