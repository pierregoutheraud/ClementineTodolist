import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import InputCheck from "./InputCheck";

describe("InputCheck", () => {
  test("renders checkbox", () => {
    const { queryByAccessibilityRole } = render(
      <InputCheck defaultCompleted={false} />
    );
    const checkbox = queryByAccessibilityRole("checkbox");
    expect(checkbox).toBeTruthy();
  });

  test("should diplay icon depending on default completed value", done => {
    const { queryByAccessibilityLabel } = render(
      <InputCheck defaultCompleted={true} />
    );

    setTimeout(() => {
      const icon = queryByAccessibilityLabel("completed-icon");
      expect(icon).toBeTruthy();
      done();
    }, 1000);
  });

  test("should hide icon depending on default completed value", done => {
    const { queryByAccessibilityLabel } = render(
      <InputCheck defaultCompleted={false} />
    );

    setTimeout(() => {
      const icon = queryByAccessibilityLabel("completed-icon");
      expect(icon).toBeNull();
      done();
    }, 1000);
  });

  test("should display icon when pressing on it", async () => {
    const { queryByAccessibilityRole, queryByAccessibilityLabel } = render(
      <InputCheck defaultCompleted={false} />
    );
    const checkbox = queryByAccessibilityRole("checkbox");
    fireEvent.press(checkbox);

    await waitFor(() =>
      expect(queryByAccessibilityLabel("completed-icon")).toBeTruthy()
    );
  });

  test("should hide icon when pressing on it", async () => {
    const { queryByAccessibilityRole, queryByAccessibilityLabel } = render(
      <InputCheck defaultCompleted={true} />
    );
    const checkbox = queryByAccessibilityRole("checkbox");
    fireEvent.press(checkbox);

    await waitFor(() =>
      expect(queryByAccessibilityLabel("completed-icon")).toBeNull()
    );
  });
});
