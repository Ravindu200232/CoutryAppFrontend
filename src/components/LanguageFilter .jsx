import React from "react";

const LanguageFilter = ({ selectedLanguage, setSelectedLanguage, languages }) => (
  <div className="relative w-full md:max-w-xs">
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="w-full pl-4 pr-10 py-2 rounded-lg bg-white/70 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">All Languages</option>
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
      ▼
    </div>
  </div>
);

export default LanguageFilter;
