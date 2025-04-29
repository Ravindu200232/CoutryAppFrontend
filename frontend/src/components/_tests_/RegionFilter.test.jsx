import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../RegionFilter';
import { useState } from 'react';

function RegionFilterWrapper() {
  const [region, setRegion] = useState('');
  return (
    <>
      <RegionFilter selectedRegion={region} setSelectedRegion={setRegion} />
      <p data-testid="selected-region">{region}</p>
    </>
  );
}

test('updates region on select change', () => {
  render(<RegionFilterWrapper />);
  const select = screen.getByRole('combobox');

  fireEvent.change(select, { target: { value: 'Asia' } });
  expect(screen.getByTestId('selected-region').textContent).toBe('Asia');
});
