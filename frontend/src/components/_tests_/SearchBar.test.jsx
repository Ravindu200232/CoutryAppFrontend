import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { useState } from 'react';

function SearchBarWrapper() {
  const [search, setSearch] = useState('');
  return (
    <>
      <SearchBar searchTerm={search} setSearchTerm={setSearch} />
      <p data-testid="search-value">{search}</p>
    </>
  );
}

test('updates searchTerm as user types', () => {
  render(<SearchBarWrapper />);
  const input = screen.getByRole('textbox');

  fireEvent.change(input, { target: { value: 'Sri Lanka' } });
  expect(screen.getByTestId('search-value').textContent).toBe('Sri Lanka');
});
