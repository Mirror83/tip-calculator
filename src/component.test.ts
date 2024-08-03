import { render, screen } from "@testing-library/svelte";
import App from "../src/App.svelte";
import { describe, it, expect } from "vitest";

describe("App", () => {
  it("renders", () => {
    render(App);
    expect(screen.queryByText("$0.00")).toBeVisible();
  });
});
