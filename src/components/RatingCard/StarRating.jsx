import styled from 'styled-components';
import StarIcon from './StarIcon';
import { colors } from '../../styles/colors';

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 14px;
`;
const Tile = styled.span`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  color: ${colors.white};
  background: linear-gradient(to right, ${colors.rating} 0%, ${colors.rating} var(--fill), ${colors.inactiveStar} var(--fill), ${colors.inactiveStar} 100%);
  svg { width: 34px; height: 34px; }
`;

export default function StarRating({ rating = 0 }) {
  const safeRating = Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 0;
  return (
    <Stars role="img" aria-label={`${safeRating.toFixed(1)} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Tile key={index} aria-hidden="true" style={{ '--fill': `${Math.min(1, Math.max(0, safeRating - index)) * 100}%` }}>
          <StarIcon />
        </Tile>
      ))}
    </Stars>
  );
}

