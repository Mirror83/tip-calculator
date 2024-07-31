import { expect, test } from "vitest";
import {
  calculateTipPerPerson,
  calculateTotalPerPerson,
  formatCost,
} from "./calculate-tip";

test("calculateTipPerPerson", () => {
  expect(formatCost(calculateTipPerPerson(142.55, 0.15, 5))).toBe("$4.27");
  expect(() => calculateTipPerPerson(100, 20, 2)).toThrowError(
    /Percentage must be between 0 and 1/
  );
  expect(() => calculateTipPerPerson(100, 0.5, -1)).toThrowError(
    /People must be a positive integer/
  );
});

test("calculateTotalPerPerson", () => {
  expect(calculateTotalPerPerson(142.55, 0.15, 5)).toBeCloseTo(32.7865, 4);
});
