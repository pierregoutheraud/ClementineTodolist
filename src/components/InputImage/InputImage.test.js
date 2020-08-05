jest.mock("expo-image-picker");
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InputImage from "./InputImage";
import * as ImagePicker from "expo-image-picker";

describe("InputImage", () => {
  test("renders button correctly", () => {
    const { queryByAccessibilityRole } = render(<InputImage image={null} />);
    expect(queryByAccessibilityRole("button")).toBeTruthy();
    expect(queryByAccessibilityRole("imagebutton")).toBeNull();
  });

  test("renders image correctly", () => {
    const { queryByAccessibilityRole } = render(
      <InputImage image="image.png" />
    );
    expect(queryByAccessibilityRole("button")).toBeNull();
    expect(queryByAccessibilityRole("imagebutton")).toBeTruthy();
  });

  test("calls ImagePicker when clicking on button", () => {
    const { queryByAccessibilityLabel } = render(<InputImage image={null} />);
    const button = queryByAccessibilityLabel("Add image");
    ImagePicker.launchImageLibraryAsync.mockReturnValue(
      Promise.resolve({
        cancelled: false,
        uri: "image.png",
      })
    );
    fireEvent.press(button);
    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledTimes(1);
  });
});
