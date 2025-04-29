import { MdNavigateBefore } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CountryDetail = ({ country }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakDetails = () => {
    if (!country) return;

    const textToSpeak = `
      Country Name: ${country.name}.
      Official Name: ${country.name}.
      Capital: ${country.capital || "Not Available"}.
      Region: ${country.region}.
      Subregion: ${country.subregion}.
      Population: ${country.population.toLocaleString()}.
      Area: ${
        country.area
          ? country.area.toLocaleString() + " square kilometers"
          : "Not Available"
      }.
      Currency: ${
        country.currencies
          ?.map((curr) => `${curr.name} (${curr.symbol})`)
          .join(", ") || "Not Available"
      }.
      Language: ${
        country.languages?.map((lang) => lang.name).join(", ") ||
        "Not Available"
      }.
      Demonym: ${country.demonym || "Not Available"}.
      Timezones: ${country.timezones?.join(", ") || "Not Available"}.
      Borders: ${country.borders?.join(", ") || "None"}.
      Calling Code: +${country.callingCodes?.join(", +") || "Not Available"}.
    `;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "en-US";
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    speakDetails();

    return () => {
      stopSpeaking();
    };
  }, [country]);

  if (!country) return null;

  return (
    <div className="bg-gradient-to-r  from- to-slate-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg max-w-6xl mx-auto mt-10 relative">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={country.flag}
          alt={country.name}
          className="w-full md:w-70 h-40 object-cover rounded-xl shadow"
          loading="lazy"
        />

        <div className="text-gray-800 dark:text-gray-200 w-full  space-y-1 text-base md:text-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {country.name}
          </h2>
          <p>
            <span className="font-semibold">Official Name:</span> {country.name}
          </p>
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Subregion:</span>{" "}
            {country.subregion}
          </p>
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Area:</span>{" "}
            {country.area?.toLocaleString() || "N/A"} km²
          </p>
          <p>
            <span className="font-semibold">Currency:</span>{" "}
            {country.currencies
              ?.map((curr) => `${curr.name} (${curr.symbol})`)
              .join(", ")}
          </p>
          <p>
            <span className="font-semibold">Language:</span>{" "}
            {country.languages?.map((lang) => lang.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold">Demonym:</span> {country.demonym}
          </p>
          <p>
            <span className="font-semibold">Timezones:</span>{" "}
            {country.timezones?.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Borders:</span>{" "}
            {country.borders?.join(", ") || "None"}
          </p>
          <p>
            <span className="font-semibold">Calling Code:</span> +
            {country.callingCodes?.join(", +")}
          </p>
        </div>
      </div>

      {country.latlng.length === 2 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-1">Map View:</h3>
          <iframe
            title="Google Map"
            width="100%"
            height="300"
            loading="lazy"
            className="rounded-lg border"
            src={`https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&hl=es;z=6&output=embed`}
            allowFullScreen
          />
        </div>
      )}

      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={speakDetails}
          disabled={isSpeaking}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition disabled:opacity-50"
        >
          🔊 Play Voice
        </button>

        <button
          onClick={stopSpeaking}
          disabled={!isSpeaking}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition disabled:opacity-50"
        >
          ⏹️ Stop Voice
        </button>
      </div>

      <Link
        to="/"
        className="fixed bottom-6  right-6 bg-primary hover:bg-indigo-700 text-white px-3 py-2 rounded-full shadow-lg transition-all"
        aria-label="Back to home"
      >
        <MdNavigateBefore className="text-2xl" />
      </Link>
    </div>
  );
};

export default CountryDetail;
