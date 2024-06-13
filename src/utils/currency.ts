import axios from "axios";

function toDecimal(balance: number): number {
    return parseFloat((Math.round(balance * 100) / 100).toFixed(2));
}

async function getExchangeRate(fromCurrency: string, toCurrency: string) {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const rates = response.data.rates;
    return rates[toCurrency];
}