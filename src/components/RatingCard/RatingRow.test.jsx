import { render, screen } from '@testing-library/react';
import RatingRow from './RatingRow';

test('describes the star count and fills its proportion of all reviews', () => {
  render(<ul><RatingRow stars={4} count={3} total={12} /></ul>);
  const meter = screen.getByRole('meter', { name: '4 star reviews' });
  expect(meter).toHaveAttribute('aria-valuemin', '0');
  expect(meter).toHaveAttribute('aria-valuemax', '12');
  expect(meter).toHaveAttribute('aria-valuenow', '3');
  expect(meter).toHaveAttribute('aria-valuetext', '3 of 12 reviews');
  expect(meter.firstElementChild.style.getPropertyValue('--fill')).toBe('25%');
});

test('renders an empty meter without division by zero', () => {
  render(<ul><RatingRow stars={1} count={0} total={0} /></ul>);
  const meter = screen.getByRole('meter', { name: '1 star reviews' });
  expect(meter).toHaveAttribute('aria-valuenow', '0');
  expect(meter).toHaveAttribute('aria-valuemax', '1');
  expect(meter).toHaveAttribute('aria-valuetext', '0 of 0 reviews');
  expect(meter.firstElementChild.style.getPropertyValue('--fill')).toBe('0%');
});

test('formats large counts consistently for sighted and screen reader users', () => {
  render(<ul><RatingRow stars={5} count={1000000} total={2000000} /></ul>);
  expect(screen.getByText('1,000,000')).toBeInTheDocument();
  const meter = screen.getByRole('meter', { name: '5 star reviews' });
  expect(meter).toHaveAttribute('aria-valuetext', '1,000,000 of 2,000,000 reviews');
  expect(meter.firstElementChild.style.getPropertyValue('--fill')).toBe('50%');
});
