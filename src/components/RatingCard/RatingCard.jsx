import { useId } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RatingSummary from './RatingSummary';
import RatingDistribution from './RatingDistribution';
import { getRatingSummary, isValidCounts } from '../../utils/ratingSummary';
import { colors } from '../../styles/colors';

const EMPTY_COUNTS = {};
const Card = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 360px;
  padding: 36px 20px 16px;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  background: ${colors.white};
  color: ${colors.text};
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  & *, & *::before, & *::after { box-sizing: border-box; }
  @media (max-width: 359px) { padding-inline: 16px; }
`;

export default function RatingCard({ counts = EMPTY_COUNTS, title = 'Product Rating', className }) {
  // React 19 does not invoke function-component PropTypes automatically.
  if (process.env.NODE_ENV !== 'production') {
    PropTypes.checkPropTypes(RatingCard.propTypes, { counts, title, className }, 'prop', 'RatingCard');
  }
  const titleId = useId();
  const { rows, rating, label, total } = getRatingSummary(counts);
  return (
    <Card className={className} aria-labelledby={titleId}>
      <RatingSummary rating={rating} label={label} hasReviews={total > 0} title={title} titleId={titleId} />
      <RatingDistribution rows={rows} total={total} />
    </Card>
  );
}

RatingCard.propTypes = {
  counts(props, propName, componentName) {
    if (!isValidCounts(props[propName])) {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`: expected star keys 1–5 and nonnegative safe integer counts with a safe total.`);
    }
    return null;
  },
  title: PropTypes.string,
  className: PropTypes.string,
};
