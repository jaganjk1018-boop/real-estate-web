// Real Estate Area Market Rate Intelligence Engine
// Mathematical models, land unit conversions, and rate aggregation formulas

export const LAND_UNITS = [
  { id: 'sqft', label: 'Sq.Ft (Square Feet)', short: 'sq.ft', multiplierFromSqFt: 1 },
  { id: 'cents', label: 'Cents (1 Cent = 435.6 sq.ft)', short: 'cents', multiplierFromSqFt: 1 / 435.6 },
  { id: 'grounds', label: 'Grounds (1 Ground = 2,400 sq.ft)', short: 'grounds', multiplierFromSqFt: 1 / 2400 },
  { id: 'acres', label: 'Acres (1 Acre = 43,560 sq.ft = 100 Cents)', short: 'acres', multiplierFromSqFt: 1 / 43560 },
  { id: 'sqm', label: 'Square Meters (m²)', short: 'm²', multiplierFromSqFt: 0.092903 }
];

/**
 * Converts area in Sq.Ft to target unit
 */
export function convertLandArea(sqFt, targetUnit = 'sqft') {
  if (!sqFt || isNaN(sqFt)) return 0;
  switch (targetUnit) {
    case 'cents':
      return Number((sqFt / 435.6).toFixed(2));
    case 'grounds':
      return Number((sqFt / 2400).toFixed(2));
    case 'acres':
      return Number((sqFt / 43560).toFixed(3));
    case 'sqm':
      return Number((sqFt * 0.092903).toFixed(1));
    case 'sqft':
    default:
      return Math.round(sqFt);
  }
}

/**
 * Formats land area with unit label
 */
export function formatLandArea(sqFt, unit = 'sqft') {
  const converted = convertLandArea(sqFt, unit);
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: unit === 'acres' ? 3 : 2
  }).format(converted);

  switch (unit) {
    case 'cents':
      return `${formattedNumber} Cents`;
    case 'grounds':
      return `${formattedNumber} Grounds`;
    case 'acres':
      return `${formattedNumber} Acres`;
    case 'sqm':
      return `${formattedNumber} m²`;
    case 'sqft':
    default:
      return `${new Intl.NumberFormat('en-IN').format(Math.round(sqFt))} sq.ft`;
  }
}

/**
 * Calculates rate per selected land unit (e.g. Rate per Cent, Rate per Ground)
 */
export function calculateRatePerUnit(ratePerSqFt, targetUnit = 'sqft') {
  if (!ratePerSqFt) return 0;
  switch (targetUnit) {
    case 'cents':
      return Math.round(ratePerSqFt * 435.6);
    case 'grounds':
      return Math.round(ratePerSqFt * 2400);
    case 'acres':
      return Math.round(ratePerSqFt * 43560);
    case 'sqm':
      return Math.round(ratePerSqFt / 0.092903);
    case 'sqft':
    default:
      return Math.round(ratePerSqFt);
  }
}

/**
 * Formula 2: Automatic Rate Calculation
 * Formula:
 * Average Area Rate =
 * Total Price Per Sq.ft of All Active Property Listings ÷ Total Number of Listings
 */
export function calculateAverageAreaRate(activeListings = []) {
  if (!activeListings || activeListings.length === 0) return 0;
  
  const totalRateSum = activeListings.reduce((sum, item) => {
    const rate = item.pricePerSqFt || (item.price && item.areaSqFt ? Math.round(item.price / item.areaSqFt) : 0);
    return sum + rate;
  }, 0);

  const totalCount = activeListings.length;
  const averageRate = Math.round(totalRateSum / totalCount);

  return {
    totalRateSum,
    totalCount,
    averageRate,
    formulaText: `Average Area Rate = Total Price Per Sq.ft (₹${new Intl.NumberFormat('en-IN').format(totalRateSum)}) ÷ Total Listings (${totalCount}) = ₹${new Intl.NumberFormat('en-IN').format(averageRate)}/sq.ft`
  };
}

/**
 * Multi-Source Weighted Rate Calculator
 * Data Sources:
 * - Property Listings (45%)
 * - Broker Submitted Rates (25%)
 * - Owner Submitted Rates (15%)
 * - Verified Sale Records / SRO (15%)
 */
export function calculateWeightedMarketRate(dataSources = []) {
  if (!dataSources || dataSources.length === 0) return 0;

  let totalWeightedRate = 0;
  let totalShare = 0;

  dataSources.forEach(source => {
    totalWeightedRate += source.avgRate * (source.share / 100);
    totalShare += source.share;
  });

  return Math.round(totalWeightedRate / (totalShare / 100));
}

/**
 * Compares two real estate areas across price, growth, demand, and future prospects
 */
export function compareAreas(areaA, areaB) {
  if (!areaA || !areaB) return null;

  const rateDelta = areaA.currentAvgRateSqFt - areaB.currentAvgRateSqFt;
  const growthDelta = Number((areaA.oneYearGrowth - areaB.oneYearGrowth).toFixed(1));
  const demandDelta = Number((areaA.demandScore - areaB.demandScore).toFixed(1));

  let winner = areaA.name;
  let verdict = '';

  if (areaA.oneYearGrowth > areaB.oneYearGrowth && areaA.investmentScore >= areaB.investmentScore) {
    winner = areaA.name;
    verdict = `${areaA.name} leads with higher capital acceleration (+${areaA.oneYearGrowth}% vs +${areaB.oneYearGrowth}%) and stronger plotted absorption momentum.`;
  } else if (areaB.oneYearGrowth > areaA.oneYearGrowth) {
    winner = areaB.name;
    verdict = `${areaB.name} offers higher trailing 1-year growth (+${areaB.oneYearGrowth}% vs +${areaA.oneYearGrowth}%), making it a prime candidate for short-term growth seekers.`;
  } else {
    verdict = `Both ${areaA.name} and ${areaB.name} present complementary investment characteristics.`;
  }

  return {
    areaA,
    areaB,
    rateDelta,
    growthDelta,
    demandDelta,
    winner,
    verdict
  };
}
