import Big from "big.js";

export const convertSubunitToUnit = ({
  amount,
  precision,
}: {
  amount: string;
  precision: number;
}) => {
  const precisionFactor = new Big(10).pow(precision);
  return new Big(amount).div(precisionFactor).toFixed(precision);
};

export const convertUnitToSubunit = ({
  amount,
  precision,
}: {
  amount: string;
  precision: number;
}) => {
  const precisionFactor = new Big(10).pow(precision);
  return new Big(amount).mul(precisionFactor).toFixed(0);
}; 

export const convertPriceToDexPrice = (price: string): string => {
  // Convert to Big for precise calculations
  const priceBig = new Big(price);
  
  // Check for zero price
  if (priceBig.eq(0)) {
    throw new Error('Zero price is not allowed');
  }

  // Convert to integer by truncating decimals
  const integerPart = priceBig.toFixed(0);
  
  // If the number ends with 0, convert to scientific notation
  if (integerPart.endsWith('0')) {
    // Count trailing zeros
    const trailingZeros = integerPart.match(/0+$/)?.[0].length || 0;
    // Remove trailing zeros and add scientific notation
    const baseNumber = integerPart.slice(0, -trailingZeros);
    return `${baseNumber}e${trailingZeros}`;
  }

  // For numbers not ending in 0, return as is
  return integerPart;
};

export const convertPriceToDexPriceFormat = (price: string): string => {
  // Convert to Big for precise calculations
  const priceBig = new Big(price);
  
  // Check for zero price
  if (priceBig.eq(0)) {
    throw new Error('Zero price is not allowed');
  }

  // Convert to scientific notation
  const scientific = priceBig.toExponential();
  const [numberPart, exponentPart] = scientific.split('e');
  
  // Parse the exponent
  const exponent = parseInt(exponentPart);
  
  // Special case: if price is 1e0, return just "1"
  if (numberPart === "1" && exponent === 0) {
    return "1";
  }
  
  // Validate exponent range
  if (exponent < -100 || exponent > 100) {
    throw new Error('Exponent must be between -100 and 100');
  }

  // Normalize the number part
  let normalizedNumber = numberPart.replace('.', '');
  
  // Remove trailing zeros
  normalizedNumber = normalizedNumber.replace(/0+$/, '');
  
  // Ensure number part doesn't exceed 19 digits
  if (normalizedNumber.length > 19) {
    throw new Error('Number part cannot exceed 19 digits');
  }

  // Special case: if exponent is 0, return the normalized number without scientific notation
  if (exponent === 0) {
    return normalizedNumber.replace(/0+$/, '');
  }

  // Construct the final price string
  const finalPrice = `${normalizedNumber}e${exponent}`;
  
  // Validate against the required regex pattern
  const priceRegex = /^(([1-9])|([1-9]\d*[1-9]))(e-?[1-9]\d*)?$/;
  if (!priceRegex.test(finalPrice)) {
    throw new Error('Invalid price format');
  }

  return finalPrice;
};

export const convertDexPriceToNumber = (dexPrice: string): string => {
  // Handle empty or invalid input
  if (!dexPrice) {
    return "0";
  }

  try {
    // If the price is already a regular number, return it
    if (!dexPrice.includes('e')) {
      return dexPrice;
    }

    // Split the scientific notation
    const [numberPart, exponentPart] = dexPrice.split('e');
    const exponent = parseInt(exponentPart);

    // Convert to regular number
    const result = new Big(numberPart).times(new Big(10).pow(exponent));
    
    // Convert to string and remove trailing zeros
    return result.toString();
  } catch (error) {
    console.error('Error converting DEX price to number:', error);
    return "0";
  }
};
