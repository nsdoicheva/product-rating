# Product rating card

Rating card created using React, PropTypes, styled-components, Google Poppins, Jest and Testing Library.

![Product rating card showing a 4.6 out of 5 score and the review distribution](docs/product-rating.png)

## Run

Requires Node.js 24.11+ and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The demo uses the reference review counts.

## Verify

```sh
npm test
npm run test:coverage
npm run lint
npm run build
```

Unit tests cover calculations, rounding, invalid/empty data, rendering and prop updates.

## Usage

```jsx
import RatingCard from './components/RatingCard/RatingCard';

const counts = { 1: 40, 2: 14, 3: 55, 4: 171, 5: 952 };

<RatingCard counts={counts} />
```

- `counts`: nonnegative safe integer review counts keyed by star value 1-5, with a safe integer total. Missing keys mean zero.
- `title`: defaults to "Product Rating".
- `className`: supports host styling and styled-components composition.

Omitting `counts` shows "No reviews yet"; invalid counts show "Rating unavailable" with zeroed bars. The card adapts to its parent up to 360px wide and recalculates when `counts` changes.

## Structure

- `RatingCard`: input validation, calculations and composition.
- `RatingSummary`: descriptive label, score, stars, title and Feefo logo.
- `StarRating` / `StarIcon`: fractional star tiles and decorative vector.
- `RatingDistribution` / `RatingRow`: descending review counts and accessible meters.
- `ratingSummary`: pure calculation and validation functions, independent of React.
- `styles/colors`: shared UI colors; edit them here without adding a theme provider. The bundled logo retains its own brand colors.

Bars show each count as a proportion of all reviews. The sample has 1,232 reviews and displays 4.6 out of 5. Integer arithmetic (`BigInt`) rounds halfway values up exactly, including 4.15 to 4.2 and large-count cases. Labels use the rounded score: Excellent >= 4.5, Great >= 3.5, Average >= 2.5, Poor >= 1.5, otherwise Bad.
