export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

// Currency Exchange Rates (Base USD)
export const CURRENCY_RATES = {
  USD: 1.0,
  INR: 86.5,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  CHF: 0.88,
  JPY: 154.0
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  AED: 'AED ',
  CHF: 'CHF ',
  JPY: '¥'
};

export function convertPrice(price, targetCurrency, baseCurrency = '$') {
  if (!price && price !== 0) return 0;
  
  // Normalize targetCurrency: if not provided, fallback to client-side localStorage
  let targetCode = targetCurrency;
  if (!targetCode && typeof window !== 'undefined') {
    try {
      targetCode = localStorage.getItem('aura_currency');
    } catch (e) {}
  }
  if (!targetCode) targetCode = 'USD';

  if (targetCode === '$') targetCode = 'USD';
  else if (targetCode === '₹') targetCode = 'INR';
  else if (targetCode === '€') targetCode = 'EUR';
  else if (targetCode === '£') targetCode = 'GBP';
  else if (targetCode === '¥') targetCode = 'JPY';

  // Normalize baseCurrency
  let baseCode = baseCurrency || '$';
  if (baseCode === '$') baseCode = 'USD';
  else if (baseCode === '₹') baseCode = 'INR';
  else if (baseCode === '€') baseCode = 'EUR';
  else if (baseCode === '£') baseCode = 'GBP';
  else if (baseCode === '¥') baseCode = 'JPY';

  let priceInUSD = Number(price);
  if (baseCode === 'INR') {
    priceInUSD = priceInUSD / (CURRENCY_RATES['INR'] || 86.5);
  } else if (baseCode === 'EUR') {
    priceInUSD = priceInUSD / (CURRENCY_RATES['EUR'] || 0.92);
  } else if (baseCode === 'GBP') {
    priceInUSD = priceInUSD / (CURRENCY_RATES['GBP'] || 0.79);
  } else if (baseCode === 'AED') {
    priceInUSD = priceInUSD / (CURRENCY_RATES['AED'] || 3.67);
  } else if (baseCode === 'CHF') {
    priceInUSD = priceInUSD / (CURRENCY_RATES['CHF'] || 0.88);
  } else if (baseCode === 'JPY') {
    priceInUSD = priceInUSD / (CURRENCY_RATES['JPY'] || 154.0);
  }

  const rate = CURRENCY_RATES[targetCode] || 1.0;
  return Math.round(priceInUSD * rate);
}

export function formatLocalizedPrice(price, targetCurrency, priceSuffix = '', baseCurrency = '$') {
  if (!price && price !== 0) return '';

  let targetCode = targetCurrency;
  if (!targetCode && typeof window !== 'undefined') {
    try {
      targetCode = localStorage.getItem('aura_currency');
    } catch (e) {}
  }
  if (!targetCode) targetCode = 'USD';

  if (targetCode === '$') targetCode = 'USD';
  else if (targetCode === '₹') targetCode = 'INR';
  else if (targetCode === '€') targetCode = 'EUR';
  else if (targetCode === '£') targetCode = 'GBP';
  else if (targetCode === '¥') targetCode = 'JPY';

  const converted = convertPrice(price, targetCode, baseCurrency);
  const symbol = CURRENCY_SYMBOLS[targetCode] || '$';

  // For INR, check if Lakhs / Crores is suitable for ultra clean luxury display
  if (targetCode === 'INR') {
    if (converted >= 10000000) {
      const cr = (converted / 10000000).toFixed(2);
      return `${symbol}${cr} Cr${priceSuffix ? ` ${priceSuffix}` : ''}`;
    } else if (converted >= 100000) {
      const lakh = (converted / 100000).toFixed(2);
      return `${symbol}${lakh} L${priceSuffix ? ` ${priceSuffix}` : ''}`;
    }
    const formattedIN = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(converted);
    return `${symbol}${formattedIN}${priceSuffix ? ` ${priceSuffix}` : ''}`;
  }

  // Format with standard commas
  const formattedNumber = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(converted);

  return `${symbol}${formattedNumber}${priceSuffix ? ` ${priceSuffix}` : ''}`;
}

export function formatPrice(price, currency, priceSuffix = '', baseCurrency = '$') {
  return formatLocalizedPrice(price, currency, priceSuffix, baseCurrency);
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatNumberIndian(num) {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function convertArea(sqFt, unit) {
  let targetUnit = unit;
  if (!targetUnit && typeof window !== 'undefined') {
    try {
      targetUnit = localStorage.getItem('aura_unit');
    } catch (e) {}
  }
  if (!targetUnit) targetUnit = 'sqft';

  if (targetUnit === 'sqm') {
    return Math.round(sqFt * 0.092903);
  }
  if (targetUnit === 'cents') {
    return Number((sqFt / 435.6).toFixed(2));
  }
  if (targetUnit === 'grounds') {
    return Number((sqFt / 2400).toFixed(2));
  }
  if (targetUnit === 'acres') {
    return Number((sqFt / 43560).toFixed(3));
  }
  return sqFt;
}

export function formatLocalizedArea(sqFt, unit) {
  let targetUnit = unit;
  if (!targetUnit && typeof window !== 'undefined') {
    try {
      targetUnit = localStorage.getItem('aura_unit');
    } catch (e) {}
  }
  if (!targetUnit) targetUnit = 'sqft';

  const converted = convertArea(sqFt, targetUnit);
  let label = 'sq ft';
  if (targetUnit === 'sqm') label = 'm²';
  else if (targetUnit === 'cents') label = 'Cents';
  else if (targetUnit === 'grounds') label = 'Grounds';
  else if (unit === 'acres') label = 'Acres';

  const locale = (unit === 'cents' || unit === 'grounds') ? 'en-IN' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: unit === 'acres' ? 3 : 2
  }).format(converted);

  return `${formatted} ${label}`;
}

export function calculateEMI(
  propertyPrice,
  downPaymentPercent = 20,
  annualInterestRate = 6.5,
  loanTenureYears = 30,
  annualPropertyTaxRate = 1.2,
  annualHomeInsuranceRate = 0.5,
  monthlyHOA = 350
) {
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalMonths = loanTenureYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyRate > 0) {
    monthlyPrincipalAndInterest =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPrincipalAndInterest = loanAmount / totalMonths;
  }

  const totalPayment = monthlyPrincipalAndInterest * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const monthlyPropertyTax = (propertyPrice * (annualPropertyTaxRate / 100)) / 12;
  const monthlyHomeInsurance = (propertyPrice * (annualHomeInsuranceRate / 100)) / 12;
  const totalMonthlyTotal = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHOA;

  return {
    monthlyPayment: Math.round(monthlyPrincipalAndInterest),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    loanAmount: Math.round(loanAmount),
    downPaymentAmount: Math.round(downPaymentAmount),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyHomeInsurance: Math.round(monthlyHomeInsurance),
    monthlyHOA: Math.round(monthlyHOA),
    totalMonthlyTotal: Math.round(totalMonthlyTotal)
  };
}

export function calculateLoanEligibility(
  monthlyGrossIncome,
  existingMonthlyDebts = 0,
  annualInterestRate = 6.5,
  loanTenureYears = 30,
  downPaymentSavings = 150000
) {
  const maxAllowableMonthlyDebt = monthlyGrossIncome * 0.43;
  const availableForMortgage = Math.max(0, maxAllowableMonthlyDebt - existingMonthlyDebts);

  const monthlyRate = annualInterestRate / 100 / 12;
  const totalMonths = loanTenureYears * 12;

  let eligibleLoanAmount = 0;
  if (monthlyRate > 0) {
    eligibleLoanAmount =
      (availableForMortgage * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
  } else {
    eligibleLoanAmount = availableForMortgage * totalMonths;
  }

  const maxPropertyBudget = eligibleLoanAmount + downPaymentSavings;
  const debtToIncomeRatio = Math.min(100, Math.round(((existingMonthlyDebts + availableForMortgage) / monthlyGrossIncome) * 100));

  return {
    eligibleLoanAmount: Math.round(eligibleLoanAmount),
    maxPropertyBudget: Math.round(maxPropertyBudget),
    estimatedMonthlyEMI: Math.round(availableForMortgage),
    debtToIncomeRatio
  };
}

export function calculateInvestmentROI(
  propertyPrice,
  {
    rentalStrategy = 'luxury-short-term', // 'luxury-short-term' | 'corporate-long-term'
    nightlyRate = Math.round(propertyPrice * 0.00035), // e.g. ~$6,500/night for 18.5M
    occupancyRate = 65, // %
    monthlyLongTermRent = Math.round(propertyPrice * 0.0042), // e.g. ~$77,000/mo
    annualAppreciationRate = 6.0, // %
    managementFeeRate = 12, // %
    annualMaintenanceRate = 1.0, // %
    propertyTaxRate = 1.2, // %
    downPaymentPercent = 30,
    mortgageInterestRate = 6.25,
    mortgageYears = 30
  } = {}
) {
  // 1. Gross Annual Rental Revenue
  let grossAnnualRevenue = 0;
  if (rentalStrategy === 'luxury-short-term') {
    const bookedNights = Math.round(365 * (occupancyRate / 100));
    grossAnnualRevenue = bookedNights * nightlyRate;
  } else {
    grossAnnualRevenue = monthlyLongTermRent * 12;
  }

  // 2. Annual Operating Expenses
  const managementFee = Math.round((grossAnnualRevenue * managementFeeRate) / 100);
  const propertyTax = Math.round((propertyPrice * propertyTaxRate) / 100);
  const maintenance = Math.round((propertyPrice * annualMaintenanceRate) / 100);
  const luxuryInsurance = Math.round(propertyPrice * 0.0045);
  const totalOperatingExpenses = managementFee + propertyTax + maintenance + luxuryInsurance;

  // 3. Net Operating Income (NOI)
  const netOperatingIncome = Math.max(0, grossAnnualRevenue - totalOperatingExpenses);

  // 4. Yields
  const grossYield = ((grossAnnualRevenue / propertyPrice) * 100).toFixed(2);
  const capRate = ((netOperatingIncome / propertyPrice) * 100).toFixed(2);

  // 5. Debt Service & Cash-on-Cash Return
  const downPayment = Math.round((propertyPrice * downPaymentPercent) / 100);
  const loanAmount = propertyPrice - downPayment;
  const emiData = calculateEMI(propertyPrice, downPaymentPercent, mortgageInterestRate, mortgageYears);
  const annualDebtService = emiData.monthlyPayment * 12;
  const annualCashFlow = netOperatingIncome - annualDebtService;
  const cashOnCashReturn = ((annualCashFlow / downPayment) * 100).toFixed(2);

  // 6. 10-Year Capital Appreciation Schedule
  const projectionSchedule = [];
  let currentVal = propertyPrice;
  let cumulativeCashFlow = 0;

  for (let year = 1; year <= 10; year++) {
    currentVal = Math.round(currentVal * (1 + annualAppreciationRate / 100));
    cumulativeCashFlow += annualCashFlow;
    const totalEquity = currentVal - Math.max(0, loanAmount * (1 - (year / mortgageYears) * 0.8));
    const totalGain = (currentVal - propertyPrice) + cumulativeCashFlow;
    const totalROI = ((totalGain / downPayment) * 100).toFixed(1);

    if (year === 1 || year === 3 || year === 5 || year === 10) {
      projectionSchedule.push({
        year,
        propertyValue: currentVal,
        cumulativeRentalCashFlow: Math.round(cumulativeCashFlow),
        estimatedEquity: Math.round(totalEquity),
        totalROI: Number(totalROI)
      });
    }
  }

  return {
    grossAnnualRevenue: Math.round(grossAnnualRevenue),
    totalOperatingExpenses,
    netOperatingIncome,
    grossYield: Number(grossYield),
    capRate: Number(capRate),
    downPayment,
    loanAmount,
    annualDebtService,
    annualCashFlow,
    cashOnCashReturn: Number(cashOnCashReturn),
    projectionSchedule
  };
}
