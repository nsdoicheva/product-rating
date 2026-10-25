import { render, screen, within } from '@testing-library/react';
import PropTypes from 'prop-types';
import RatingCard from './RatingCard';

const counts = { 1: 40, 2: 14, 3: 55, 4: 171, 5: 952 };

test('renders the reference summary and all five review counts', () => {
  render(<RatingCard counts={counts} />);
  const card = screen.getByRole('region', { name: 'Product Rating' });
  expect(within(card).getByRole('heading', { name: 'Excellent' })).toBeInTheDocument();
  expect(within(card).getByRole('img', { name: '4.6 out of 5 stars' })).toBeInTheDocument();
  expect(within(card).getByText('4.6 out of 5')).toBeInTheDocument();
  expect(within(card).getByRole('img', { name: 'Feefo' })).toBeInTheDocument();
  expect(within(card).getAllByRole('listitem')).toHaveLength(5);
  const meters = within(card).getAllByRole('meter');
  expect(meters.map((meter) => meter.getAttribute('aria-valuenow'))).toEqual(['952', '171', '55', '14', '40']);
  expect(meters[0]).toHaveAttribute('aria-valuemax', '1232');
  expect(meters[0]).toHaveAttribute('aria-label', '5 star reviews');
  expect(meters[0]).toHaveAttribute('aria-valuetext', '952 of 1,232 reviews');
});

test('recalculates the complete card when props change', () => {
  const { rerender } = render(<RatingCard counts={counts} />);
  rerender(<RatingCard counts={{ 1: 10 }} title="Service Rating" />);
  expect(screen.getByRole('region', { name: 'Service Rating' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Bad' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: '1.0 out of 5 stars' })).toBeInTheDocument();
  expect(screen.getByRole('meter', { name: '1 star reviews' })).toHaveAttribute('aria-valuenow', '10');
  expect(screen.getByRole('meter', { name: '5 star reviews' })).toHaveAttribute('aria-valuenow', '0');
});

test('renders an honest empty state', () => {
  render(<RatingCard />);
  expect(screen.getByRole('heading', { name: 'No reviews yet' })).toBeInTheDocument();
  expect(screen.getByText('No reviews yet', { selector: 'p' })).toBeInTheDocument();
  expect(screen.getAllByRole('meter').every((meter) => meter.getAttribute('aria-valuenow') === '0')).toBe(true);
});

test('keeps section names independent when multiple cards are embedded', () => {
  render(<><RatingCard counts={{ 5: 1 }} /><RatingCard counts={{ 1: 1 }} /></>);
  const cards = screen.getAllByRole('region');
  const ids = cards.map((card) => card.getAttribute('aria-labelledby'));
  expect(new Set(ids).size).toBe(2);
  expect(ids.every((id) => document.getElementById(id))).toBe(true);
});

test('formats large review counts', () => {
  render(<RatingCard counts={{ 5: 1000000 }} />);
  expect(screen.getByText('1,000,000')).toBeInTheDocument();
});

test('warns through PropTypes and displays a safe fallback for invalid data', () => {
  PropTypes.resetWarningCache();
  const warning = jest.spyOn(console, 'error').mockImplementation(() => {});
  try {
    render(<RatingCard counts={{ 5: -2 }} />);
    expect(screen.getByRole('heading', { name: 'Rating unavailable' })).toBeInTheDocument();
    expect(warning).toHaveBeenCalledWith(expect.stringContaining('Invalid prop `counts`'));
    expect(screen.queryByText(/NaN|Infinity/)).not.toBeInTheDocument();
  } finally {
    warning.mockRestore();
  }
});
