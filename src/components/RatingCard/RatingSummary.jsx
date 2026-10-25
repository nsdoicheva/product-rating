import styled from 'styled-components';
import StarRating from './StarRating';
import feefoLogo from '../../assets/feefo-logo.svg';
import { colors } from '../../styles/colors';

const Summary = styled.header`text-align: center;`;
const Label = styled.h2`
  margin: 0;
  color: ${colors.heading};
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.125em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
`;
const Score = styled.p`
  margin: 16px 0 0;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.125em;
  text-transform: uppercase;
`;
const Brand = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
`;
const Title = styled.p`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
  overflow-wrap: anywhere;
  min-width: 0;
`;
const Logo = styled.img`width: 92px; height: 27px; object-fit: contain;`;

export default function RatingSummary({ rating, label, hasReviews, title, titleId }) {
  return (
    <Summary>
      <Label>{label}</Label>
      <StarRating rating={rating} />
      <Score>{hasReviews ? `${rating.toFixed(1)} out of 5` : label}</Score>
      <Brand>
        <Title id={titleId}>{title}</Title>
        <Logo src={feefoLogo} alt="Feefo" width="92" height="27" />
      </Brand>
    </Summary>
  );
}

