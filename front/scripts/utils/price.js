export const formatPrice = (price) => Math.round(parseFloat(price.toString().replace(/,/, '.').replace(/\s/, '')) * 100) / 100 || 0;
