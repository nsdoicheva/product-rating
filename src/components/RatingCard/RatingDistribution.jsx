import styled from 'styled-components';
import RatingRow from './RatingRow';

const Distribution = styled.ul`
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
`;

export default function RatingDistribution({ rows, total }) {
  const longestCount = Math.max(...rows.map(({ count }) => count)).toLocaleString('en-GB');
  return (
    <Distribution aria-label="Review distribution" style={{ '--count-width': `${Math.max(3, longestCount.length)}ch` }}>
      {rows.map(({ stars, count }) => <RatingRow key={stars} stars={stars} count={count} total={total} />)}
    </Distribution>
  );
}

