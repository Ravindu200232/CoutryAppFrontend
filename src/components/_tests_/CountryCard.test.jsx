// src/components/__tests__/CountryCard.test.jsx
import { render, screen } from '@testing-library/react';
import CountryCard from '../CountryCard';
import { MemoryRouter } from 'react-router-dom';

const sampleCountry = {
  name: 'Sri Lanka',
  capital: 'Sri Jayawardenepura Kotte',
  region: 'Asia',
  population: 21000000,
  flag: 'https://flagcdn.com/w320/lk.png',
  alpha3Code: 'LKA',
};

test('renders country card correctly', () => {
  render(
    <MemoryRouter>
      <CountryCard country={sampleCountry} />
    </MemoryRouter>
  );

  expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
  expect(screen.getByText(/Capital:/i)).toBeInTheDocument();
});
