// src/components/__tests__/CountryCard.test.jsx
import { render, screen } from '@testing-library/react';
import CountryCard from '../CountryCard';
import { MemoryRouter } from 'react-router-dom';

const sampleCountry = {
  name: 'Sri Lanka',
  nativeName: 'śrī laṃkāva',
  capital: 'Sri Jayawardenepura Kotte',
  region: 'Asia',
  subregion: 'Southern Asia',
  population: 21919000,
  area: 65610,
  demonym: 'Sri Lankan',
  gini: 39.3,
  latlng: [7, 81],
  timezones: ['UTC+05:30'],
  borders: ['IND'],
  topLevelDomain: ['.lk'],
  alpha2Code: 'LK',
  alpha3Code: 'LKA',
  numericCode: '144',
  callingCodes: ['94'],
  languages: [{ name: 'Sinhalese' }, { name: 'Tamil' }],
  currencies: [{ name: 'Sri Lankan rupee', symbol: 'Rs' }],
  translations: {
    DE: 'Sri Lanka',
    ES: 'Sri Lanka',
    FR: 'Sri Lanka',
    JA: 'スリランカ',
    IT: 'Sri Lanka',
    BR: 'Sri Lanka',
    PT: 'Sri Lanka',
    NL: 'Sri Lanka',
    HR: 'Šri Lanka',
    FA: 'سری‌لانکا',
    HU: 'Srí Lanka',
  },
  regionalBlocs: [{ name: 'South Asian Association for Regional Cooperation', acronym: 'SAARC' }],
  flag: 'https://flagcdn.com/w320/lk.png',
};

test('renders CountryCard correctly with country data', () => {
  render(
    <MemoryRouter>
      <CountryCard country={sampleCountry} />
    </MemoryRouter>
  );

  expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
  expect(screen.getByText(/Capital:/i)).toBeInTheDocument();
});
