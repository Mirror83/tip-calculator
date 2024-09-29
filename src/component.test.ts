import { render, screen } from "@testing-library/svelte";
import App from "../src/App.svelte";

describe("App", () => {
  it("renders", () => {
    render(App);
    expect(screen.queryByText("Bill")).toBeVisible();
  });
});
