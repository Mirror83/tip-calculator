export function calculateTipPerPerson(
  amount: number,
  tipPercent: number,
  people: number
): number {
  if (tipPercent < 0 || tipPercent > 1) {
    throw new Error("Percentage must be between 0 and 1");
  }
  if (people < 1 || !Number.isInteger(people)) {
    throw new Error("People must be a positive integer.");
  }
  return (amount * tipPercent) / people;
}

export function calculateTotalPerPerson(
  amount: number,
  tipPercent: number,
  people: number
): number {
  return amount / people + calculateTipPerPerson(amount, tipPercent, people);
}

export function truncate(tip: number, places: number = 2): number {
  console.log(`Original tip: ${tip}`);
  const rounded = tip.toFixed(places + 1);
  console.log(`Rounded: ${rounded}`);

  const truncated = rounded.slice(0, rounded.length - 1);

  return Number(truncated);
}
