import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ViewImage from "./ViewImage";

describe("ViewImage", () => {
  test("renders image and modal correctly", () => {
    const { queryByAccessibilityLabel } = render(
      <ViewImage image="image.png" />
    );
    expect(queryByAccessibilityLabel("image")).toBeTruthy();
    expect(queryByAccessibilityLabel("Image fullscreen")).toBeTruthy();
    expect(queryByAccessibilityLabel("Modal").props.visible).toEqual(false);
  });

  test("display image when pressed", async () => {
    const { queryByAccessibilityLabel } = render(
      <ViewImage image="image.png" />
    );
    const button = queryByAccessibilityLabel("Display image");
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByAccessibilityLabel("Modal").props.visible).toEqual(true);
    });
  });
});
