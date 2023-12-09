export const currency = (price: number) => {
    const currencyPrice = price.toLocaleString('en-us', { style: 'currency', currency: 'USD' });
    return `${currencyPrice[0]} ${currencyPrice.slice(1)}`;
};