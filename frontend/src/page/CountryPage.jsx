import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountryDetail from "../components/CountryDetails";
import { getCountryByCode } from "../services/api";

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCountryByCode(code)
      .then((data) => {
        setCountry(data);
        console.log(data);
      })
      .catch((err) => console.error("Error fetching country:", err));
  }, [code]);

  if (!country)
    return <p className="text-center mt-10 text-white">Loading country details...</p>;

  return (
    <div className="bg-picture relative min-h-screen bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-opacity-60 backdrop-blur-sm"></div>
      <div className="relative z-10 max-w-4xl mx-auto p-6 min-h-screen">
        <CountryDetail country={country} />
      </div>
    </div>
  );
};

export default CountryPage;
