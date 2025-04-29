const BASE_URL = "https://restcountries.com/v2";

export const getAllCountries = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  return response.json();
};

export const getCountryByName = async (name) => {
  const response = await fetch(`${BASE_URL}/name/${name}`);
  return response.json();
};

export const getCountryByCode = async (code) => {
  const response = await fetch(`${BASE_URL}/alpha/${code}`);
  return response.json();
};

export const getCountriesByRegion = async (region) => {
  const response = await fetch(`${BASE_URL}/region/${region}`);
  return response.json();
};
