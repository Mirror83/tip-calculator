export function calculateTipPerPerson(
  amount: number,
  tipPercent: number,
  people: number
): number {
  if (amount < 0) {
    throw new Error("amount cannot be negative.");
  }
  if (tipPercent < 0 || tipPercent > 1) {
    throw new Error("tipPercent must be between 0 and 1");
  }
  if (people < 1 || !Number.isInteger(people)) {
    throw new Error("people must be a positive integer");
  }

  return (amount * tipPercent) / people;
}

export function calculateTotalPerPerson(
  amount: number,
  tipPercent: number,
  people: number
): number {
  return calculateTipPerPerson(amount, tipPercent, people) + amount / people;
}

function truncate(tip: number, places: number = 2): number {
  const rounded = tip.toFixed(places + 1);
  const truncated = rounded.slice(0, rounded.length - 1);

  return Number(truncated);
}

export function formatCost(cost: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencySign: "standard",
    roundingMode: "trunc",
  });

  return formatter.format(truncate(cost));
}
