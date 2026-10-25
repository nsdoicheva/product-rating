import { render, screen } from '@testing-library/react';
import RatingSummary from './RatingSummary';

const props = {
  rating: 4.6,
  label: 'Excellent',
  hasReviews: true,
  title: 'Product Rating',
  titleId: 'product-rating-title',
};

test('renders the score, descriptive label and accessible stars', () => {
  render(<RatingSummary {...props} />);
  expect(screen.getByRole('heading', { name: 'Excellent' })).toBeInTheDocument();
  expect(screen.getByText('4.6 out of 5')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: '4.6 out of 5 stars' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Feefo' })).toBeInTheDocument();
});

test('provides the supplied title as the containing section name', () => {
  render(
    <section aria-labelledby="service-rating-title">
      <RatingSummary {...props} title="Service Rating" titleId="service-rating-title" />
    </section>,
  );
  expect(screen.getByRole('region', { name: 'Service Rating' })).toBeInTheDocument();
});

test.each(['No reviews yet', 'Rating unavailable'])(
  'shows %s instead of a fabricated numeric score', (label) => {
    render(<RatingSummary {...props} rating={0} label={label} hasReviews={false} />);
    expect(screen.getByRole('heading', { name: label })).toBeInTheDocument();
    expect(screen.getByText(label, { selector: 'p' })).toBeInTheDocument();
    expect(screen.queryByText('0.0 out of 5')).not.toBeInTheDocument();
  },
);

test('updates the score and stars when review data changes', () => {
  const { rerender } = render(<RatingSummary {...props} />);
  rerender(<RatingSummary {...props} rating={2} label="Poor" />);
  expect(screen.getByRole('heading', { name: 'Poor' })).toBeInTheDocument();
  expect(screen.getByText('2.0 out of 5')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: '2.0 out of 5 stars' })).toBeInTheDocument();
  expect(screen.queryByText('4.6 out of 5')).not.toBeInTheDocument();
});
