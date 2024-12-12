import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import App from "./App.svelte";

describe("App", () => {
  it("renders App component correctly", () => {
    // @ts-ignore
    render(App);
  });

  it("updates tip and total amount per person when tip percentage buttons are pressed given bill and people inputs are correct", async () => {
    // @ts-ignore
    render(App);

    const billInput: HTMLInputElement = screen.getByLabelText("Bill");
    const peopleInput: HTMLInputElement =
      screen.getByLabelText("Number of people");

    // The expected button percentages are 5%, 10%, 15%, 25%, 50%
    const tipPercentageButtons: HTMLButtonElement[] =
      screen.getAllByText(/\d{1,2}%$/);

    const tipAmountPerPerson: HTMLElement =
      screen.getByTestId("tip-per-person");

    const totalAmountPerPerson: HTMLElement =
      screen.getByTestId("total-per-person");

    expect(tipAmountPerPerson).toHaveTextContent("$0.00");
    expect(totalAmountPerPerson).toHaveTextContent("$0.00");

    expect(tipPercentageButtons).toHaveLength(5);

    await userEvent.type(billInput, "100");
    await userEvent.type(peopleInput, "2");

    let currentTipAmountPerPerson = "$0.00";
    let currentTotalAmountPerPerson = "$0.00";

    for (const button of tipPercentageButtons) {
      await userEvent.click(button);
      expect(button).toHaveClass("bg-strong-cyan");
      expect(tipAmountPerPerson).not.toHaveTextContent(
        currentTipAmountPerPerson
      );
      expect(totalAmountPerPerson).not.toHaveTextContent(
        currentTotalAmountPerPerson
      );
      currentTipAmountPerPerson = tipAmountPerPerson.textContent!;
      currentTotalAmountPerPerson = totalAmountPerPerson.textContent!;
    }
  });

  it("resets input fields when reset button is clicked", async () => {
    // @ts-ignore
    render(App);

    const billInput: HTMLInputElement = screen.getByLabelText("Bill");
    const customTipPercentageInput: HTMLInputElement = screen.getByTestId(
      "custom-tip-percentage"
    );
    const peopleInput: HTMLInputElement =
      screen.getByLabelText("Number of people");
    const resetButton: HTMLButtonElement = screen.getByText("RESET");

    expect(resetButton).toBeDisabled();

    await userEvent.type(billInput, "100");
    await userEvent.type(customTipPercentageInput, "15");
    await userEvent.type(peopleInput, "1");

    expect(billInput).toHaveValue("100");
    expect(customTipPercentageInput).toHaveValue(15);
    expect(peopleInput).toHaveValue(1);

    expect(resetButton).toBeEnabled();

    await userEvent.click(resetButton);

    expect(billInput).toHaveValue("");

    // When an input of type "number" is cleared, it will have a value of null apparently
    expect(customTipPercentageInput).toHaveValue(null);
    expect(peopleInput).toHaveValue(null);

    expect(resetButton).toBeDisabled();
  });
});
