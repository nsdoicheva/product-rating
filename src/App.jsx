import styled from 'styled-components';
import RatingCard from './components/RatingCard/RatingCard';

const Page = styled.main`
  box-sizing: border-box;
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 24px 16px;
`;
const PageTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;

const referenceCounts = { 1: 40, 2: 14, 3: 55, 4: 171, 5: 952 };

export default function App() {
  return <Page><PageTitle>Product reviews</PageTitle><RatingCard counts={referenceCounts} /></Page>;
}
