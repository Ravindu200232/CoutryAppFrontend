import React from "react";
import { Link } from "react-router-dom";
import { Globe2, Users, Landmark } from "lucide-react";

const CountryCard = ({ country }) => (
  <Link to={`/country/${country.alpha3Code}`} className="block">
    <div className="bg-gradient-to-br from- to-slate-100 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 p-4">
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        className="w-full h-40 object-cover rounded-xl mb-4 shadow-sm"
        loading="lazy"
      />
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 truncate">
        {country.name}
      </h2>
      
      <div className="space-y-1 text-sm md:text-base text-gray-600">
        <p className="flex items-center gap-2">
          <Landmark className="w-4 h-4 text-indigo-500" />
          <span><strong className="text-gray-700">Capital:</strong> {country.capital || 'N/A'}</span>
        </p>
        <p className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-green-600" />
          <span><strong className="text-gray-700">Region:</strong> {country.region}</span>
        </p>
        <p className="flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-500" />
          <span><strong className="text-gray-700">Population:</strong> {country.population.toLocaleString()}</span>
        </p>
      </div>
    </div>
  </Link>
);

export default CountryCard;
