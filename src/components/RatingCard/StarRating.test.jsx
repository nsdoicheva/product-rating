import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

test.each([[undefined, '0.0'], [NaN, '0.0'], [Infinity, '0.0'], [-2, '0.0'], [8, '5.0'], [4.6, '4.6']])(
  'provides a bounded accessible rating for %s', (rating, expected) => {
    render(<StarRating rating={rating} />);
    expect(screen.getByRole('img', { name: `${expected} out of 5 stars` })).toBeInTheDocument();
  },
);

test('fills the final tile proportionally rather than rounding to whole stars', () => {
  const { container } = render(<StarRating rating={4.6} />);
  const tiles = container.querySelectorAll('span');
  expect(tiles).toHaveLength(5);
  const fills = [...tiles].map((tile) => parseFloat(tile.style.getPropertyValue('--fill')));
  expect(fills.slice(0, 4)).toEqual([100, 100, 100, 100]);
  expect(fills[4]).toBeCloseTo(60);
});
