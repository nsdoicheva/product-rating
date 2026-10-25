import { render, screen, within } from '@testing-library/react';
import RatingDistribution from './RatingDistribution';

test('renders the supplied star counts in order against the shared total', () => {
  render(<RatingDistribution rows={[
    { stars: 5, count: 8 }, { stars: 4, count: 0 }, { stars: 3, count: 1 },
    { stars: 2, count: 0 }, { stars: 1, count: 1 },
  ]} total={10} />);

  const list = screen.getByRole('list', { name: 'Review distribution' });
  const meters = within(list).getAllByRole('meter');
  expect(within(list).getAllByRole('listitem')).toHaveLength(5);
  expect(meters.map((meter) => meter.getAttribute('aria-label'))).toEqual([
    '5 star reviews', '4 star reviews', '3 star reviews', '2 star reviews', '1 star reviews',
  ]);
  expect(meters.map((meter) => meter.getAttribute('aria-valuenow'))).toEqual(['8', '0', '1', '0', '1']);
  for (const meter of meters) expect(meter).toHaveAttribute('aria-valuemax', '10');
});

test('replaces outdated rows and totals when props change', () => {
  const { rerender } = render(<RatingDistribution rows={[{ stars: 5, count: 8 }]} total={8} />);
  rerender(<RatingDistribution rows={[{ stars: 4, count: 3 }, { stars: 2, count: 1 }]} total={4} />);
  expect(screen.queryByRole('meter', { name: '5 star reviews' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getByRole('meter', { name: '4 star reviews' })).toHaveAttribute('aria-valuetext', '3 of 4 reviews');
  expect(screen.getByRole('meter', { name: '2 star reviews' })).toHaveAttribute('aria-valuemax', '4');
});
