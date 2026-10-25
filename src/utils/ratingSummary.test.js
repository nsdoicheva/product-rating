import { getRatingSummary } from './ratingSummary';

describe('getRatingSummary', () => {
  test('does not mutate the review counts owned by the host', () => {
    const counts = Object.freeze({ 1: 2, 5: 8 });
    expect(getRatingSummary(counts)).toMatchObject({ total: 10, rating: 4.2 });
    expect(counts).toEqual({ 1: 2, 5: 8 });
  });

  test('a caller cannot change the star scale used by later calculations', () => {
    const summary = getRatingSummary({ 5: 1 });
    summary.rows[0].stars = 1;
    summary.rows.pop();
    expect(getRatingSummary({ 5: 1 }).rows).toEqual([
      { stars: 5, count: 1 }, { stars: 4, count: 0 }, { stars: 3, count: 0 },
      { stars: 2, count: 0 }, { stars: 1, count: 0 },
    ]);
  });
  test('derives a weighted average and review total', () => {
    expect(getRatingSummary({ 1: 40, 2: 14, 3: 55, 4: 171, 5: 952 })).toMatchObject({
      total: 1232, rating: 4.6, label: 'Excellent', valid: true,
    });
  });

  test.each([
    [{ 1: 0, 2: 1, 3: 3, 4: 8, 5: 8 }, 4.2],
    [{ 2: 3, 3: 7, 4: 4, 5: 6 }, 3.7],
    [{ 4: 13, 5: 7 }, 4.4],
    [{ 4: 9, 5: 11 }, 4.6],
    [{ 1: 2, 5: 2 }, 3],
  ])('rounds decimal boundaries consistently for %j', (counts, rating) => {
    expect(getRatingSummary(counts).rating).toBe(rating);
  });

  test.each([
    [{ 4: 4053239664633441, 5: 4953959590107539 }, 4.6],
    [{ 4: 4053239664633441, 5: 4953959590107538 }, 4.5],
    [{ 4: 4053239664633440, 5: 4953959590107539 }, 4.6],
    [{ 5: Number.MAX_SAFE_INTEGER }, 5],
  ])('rounds large safe integer counts exactly for %j', (counts, rating) => {
    expect(getRatingSummary(counts).rating).toBe(rating);
  });

  test('handles an empty distribution', () => {
    expect(getRatingSummary({})).toMatchObject({ total: 0, rating: 0, label: 'No reviews yet', valid: true });
  });

  test.each([null, [], '5', { 5: -1 }, { 4: 1.5 }, { 5: Infinity }, { 5: NaN }, { 5: '8' }, { 6: 1 }, { 5: Number.MAX_SAFE_INTEGER, 4: 1 }])(
    'reports malformed data as unavailable: %j', (counts) => {
      expect(getRatingSummary(counts)).toMatchObject({ total: 0, rating: 0, label: 'Rating unavailable', valid: false });
    },
  );

  test.each([[5, 'Excellent'], [4, 'Great'], [3, 'Average'], [2, 'Poor'], [1, 'Bad']])(
    'describes an average of %s', (stars, label) => {
      expect(getRatingSummary({ [stars]: 10 }).label).toBe(label);
    },
  );
});
