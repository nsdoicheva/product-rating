import styled from 'styled-components';
import StarIcon from './StarIcon';
import { colors } from '../../styles/colors';

const Row = styled.li`
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) var(--count-width, max-content);
  align-items: center;
  gap: 14px;
  min-height: 28px;
  font-size: 0.75rem;
  line-height: 1.5;
`;
const Label = styled.span`
  display: grid;
  grid-template-columns: 1ch 18px;
  align-items: center;
  gap: 2px;
  text-align: right;
  font-weight: 600;
  svg { width: 18px; height: 18px; color: ${colors.track}; }
`;
const Track = styled.div`
  height: 10px;
  overflow: hidden;
  border-radius: 1px;
  background: ${colors.track};
`;
const Fill = styled.div`height: 100%; width: var(--fill); background: ${colors.rating};`;
const Count = styled.span`white-space: nowrap; font-variant-numeric: tabular-nums;`;
const formatCount = (value) => value.toLocaleString('en-GB');

export default function RatingRow({ stars, count, total }) {
  return (
    <Row>
      <Label aria-hidden="true"><span>{stars}</span><StarIcon /></Label>
      <Track role="meter" aria-label={`${stars} star reviews`}
        aria-valuemin={0} aria-valuemax={Math.max(total, 1)} aria-valuenow={count}
        aria-valuetext={`${formatCount(count)} of ${formatCount(total)} reviews`}>
        <Fill style={{ '--fill': `${total > 0 ? (count / total) * 100 : 0}%` }} />
      </Track>
      <Count aria-hidden="true">{formatCount(count)}</Count>
    </Row>
  );
}

