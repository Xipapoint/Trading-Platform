function toDecimal(balance: number): number {
    return parseFloat((Math.round(balance * 100) / 100).toFixed(2));
}