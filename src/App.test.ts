import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import App from "./App.svelte";

describe("App", () => {
  it("renders App component correctly", () => {
    // @ts-ignore
    render(App);
  });

  it("resets input fields and buttons when reset button is clicked", async () => {
    // @ts-ignore
    render(App);

    const billInput: HTMLInputElement = screen.getByLabelText("Bill");
    const tipInput: HTMLInputElement = screen.getByTestId("percentage-input");
    const peopleInput: HTMLInputElement =
      screen.getByLabelText("Number of people");

    screen.debug(peopleInput);

    const resetButton: HTMLButtonElement = screen.getByText("RESET");

    expect(resetButton).toBeDisabled();

    await userEvent.type(billInput, "100");
    await userEvent.type(tipInput, "15");
    await userEvent.type(peopleInput, "1");

    expect(billInput).toHaveValue("100");
    expect(tipInput).toHaveValue(15);
    expect(peopleInput).toHaveValue(1);

    expect(resetButton).toBeEnabled();

    await userEvent.click(resetButton);

    expect(billInput.value).toBe(null);
    expect(tipInput.value).toBe(null);
    expect(peopleInput.value).toBe(null);
  });

  it("bill input", () => {
    render(App);
    const input = screen.getByPlaceholderText("100.00");
    expect(input).toBeInTheDocument();
  });
});
