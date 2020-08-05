import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Todo from "./Todo";
import { FILTERS } from "../../constants/filters";
jest.mock("../../modules/todos");
import { deleteTodo, updateTodo } from "../../modules/todos";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

deleteTodo.mockImplementation(() => () => Promise.resolve(true));
updateTodo.mockImplementation(() => () => Promise.resolve(true));

describe("Todo", () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      filter: FILTERS.SHOW_ALL,
      todos: [],
    });

    component = (
      <Provider store={store}>
        <Todo
          todo={{
            id: 1,
            title: "Title1",
            completed: false,
          }}
        />
      </Provider>
    );
  });

  test("renders button correctly", () => {
    const { queryAllByAccessibilityRole, queryByAccessibilityLabel } = render(
      component
    );
    const buttons = queryAllByAccessibilityRole("button");
    expect(buttons.length).toEqual(1);

    const input = queryByAccessibilityLabel("Title");
    expect(input.props.value).toEqual("Title1");
  });

  test("renders correct edit/close icons", () => {
    const { queryByAccessibilityLabel } = render(component);
    expect(queryByAccessibilityLabel("Delete")).toBeTruthy();

    const input = queryByAccessibilityLabel("Title");
    fireEvent(input, "focus");

    expect(queryByAccessibilityLabel("Edit")).toBeTruthy();
    expect(queryByAccessibilityLabel("Delete")).toBeNull();
  });

  test("editing title triggers update action", done => {
    const { queryByAccessibilityLabel } = render(component);
    const input = queryByAccessibilityLabel("Title");
    fireEvent.changeText(input, "Test");
    setTimeout(() => {
      expect(updateTodo).toHaveBeenCalled();
      done();
    }, 1000);
  });

  test("close button triggering delete action", async () => {
    const { queryByAccessibilityLabel } = render(component);
    const deleteButton = queryByAccessibilityLabel("Delete");
    fireEvent.press(deleteButton);
    await waitFor(() => expect(deleteTodo).toHaveBeenCalledTimes(1));
  });
});
