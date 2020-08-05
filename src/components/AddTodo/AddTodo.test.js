import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddTodo from "./AddTodo";
import { FILTERS } from "../../constants/filters";
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper"); // We can safely ignore useNativeDriver warnings (only important when running the code on device)
jest.mock("../../modules/todos");
import { createTodo } from "../../modules/todos";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("AddTodo", () => {
  // Mocking createTodo action
  createTodo.mockImplementation(() => () => Promise.resolve(true));

  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      filter: FILTERS.SHOW_ALL,
      todos: [],
    });

    component = (
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );
  });

  test("renders correctly", () => {
    const { queryByPlaceholderText, queryByAccessibilityLabel } = render(
      component
    );
    const input = queryByPlaceholderText("What will you do today?");
    expect(input).toBeTruthy();

    const addButton = queryByAccessibilityLabel("Add todo");
    expect(addButton).toBeTruthy();
  });

  test("button enabled if title is not empty", async () => {
    const { queryByPlaceholderText, queryByAccessibilityLabel } = render(
      component
    );
    const input = queryByPlaceholderText("What will you do today?");
    expect(input).toBeTruthy();

    const addButton = queryByAccessibilityLabel("Add todo");
    expect(addButton).toBeTruthy();

    fireEvent.press(addButton);
    expect(store.getActions()).toEqual([]);

    fireEvent.changeText(input, "Test title");

    fireEvent.press(addButton);
    expect(createTodo).toHaveBeenCalledTimes(1);

    fireEvent.changeText(input, "");
    fireEvent.press(addButton);
    expect(createTodo).toHaveBeenCalledTimes(1);
  });

  test("resets title after submitting", async () => {
    const { queryByPlaceholderText, queryByAccessibilityLabel } = render(
      component
    );
    const input = queryByPlaceholderText("What will you do today?");
    const addButton = queryByAccessibilityLabel("Add todo");

    fireEvent.changeText(input, "Test title");
    fireEvent.press(addButton);

    await waitFor(() => expect(input.props.value).toEqual(""));
  });
});
