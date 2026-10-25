const STAR_VALUES = Object.freeze([5, 4, 3, 2, 1]);

/** Accepts only star keys 1-5 and nonnegative safe integer counts with a safe total. */
export function isValidCounts(counts) {
  return counts !== null && typeof counts === 'object' && !Array.isArray(counts)
    && Object.entries(counts).every(([star, count]) =>
      /^[1-5]$/.test(star) && Number.isSafeInteger(count) && count >= 0)
    && Number.isSafeInteger(Object.values(counts).reduce((sum, count) => sum + count, 0));
}

/** Creates fresh rows from 5 to 1 stars, treating missing counts as zero. */
function createRatingRows(counts) {
  return STAR_VALUES.map((stars) => ({ stars, count: counts[stars] ?? 0 }));
}

/** Calculates the weighted average rounded to one decimal, with halfway values rounded up. */
function calculateRating(rows, total) {
  if (total === 0) return 0;

  // Integer arithmetic preserves exact counts, even when their weighted sum exceeds Number's safe range.
  const weightedTotal = rows.reduce((sum, row) => sum + BigInt(row.count) * BigInt(row.stars), 0n);
  const reviewTotal = BigInt(total);
  // Adding half the divisor before integer division implements rounding half up.
  return Number((weightedTotal * 10n + reviewTotal / 2n) / reviewTotal) / 10;
}

/** Describes the rounded score, distinguishing invalid data from an empty review set. */
function getRatingLabel(rating, total, valid) {
  if (!valid) return 'Rating unavailable';
  if (total === 0) return 'No reviews yet';
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 3.5) return 'Great';
  if (rating >= 2.5) return 'Average';
  if (rating >= 1.5) return 'Poor';
  return 'Bad';
}

/** Combines validated counts, calculated values and display labels without mutating the input. */
export function getRatingSummary(counts = {}) {
  const valid = isValidCounts(counts);
  const rows = createRatingRows(valid ? counts : {});
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  const rating = calculateRating(rows, total);
  const label = getRatingLabel(rating, total, valid);
  return { rows, total, rating, label, valid };
}
