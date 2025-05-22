import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App component", () => {
  it("increments the counter on button click", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /count is/i });

    expect(button).toHaveTextContent("count is 0");

    await userEvent.click(button);
    expect(button).toHaveTextContent("count is 1");

    await userEvent.click(button);
    expect(button).toHaveTextContent("count is 2");
  });
});
