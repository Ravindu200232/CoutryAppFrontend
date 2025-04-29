import React from "react";
import { Search } from "lucide-react";

const LanguageSearchBar = ({ languageTerm, setLanguageTerm }) => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-40 mb-4">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-300" size={20} />
        <input
          type="text"
          placeholder="Search by language name..."
          value={languageTerm}
          onChange={(e) => setLanguageTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />
      </div>
    </div>
  );
};

export default LanguageSearchBar;
