import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Footer from "./Footer";
import { FILTERS, FILTERS_TEXT } from "../../constants/filters";
import { SET_FILTER } from "../../modules/filter";
import { CLEAR_COMPLETED_TODOS } from "../../modules/todos";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Footer", () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      filter: FILTERS.SHOW_ALL,
      todos: [],
    });

    component = (
      <Provider store={store}>
        <Footer
          todos={[
            {
              id: 1,
              title: "Title1",
              completed: false,
            },
            {
              id: 2,
              title: "Title2",
              completed: true,
            },
          ]}
        />
      </Provider>
    );
  });

  test("renders all filters correctly", () => {
    const { queryAllByAccessibilityRole } = render(component);
    const filters = queryAllByAccessibilityRole("menuitem");
    expect(filters.length).toEqual(3);
  });

  test("set correct active filter", async () => {
    const { getByText } = render(component);
    const activeFilter = getByText(FILTERS_TEXT[FILTERS.SHOW_ALL]);
    expect(activeFilter.props.style[1].color).toEqual("black");
  });

  test("dispatch set filter when pressing filter", () => {
    const { queryByAccessibilityLabel } = render(component);
    const filterToPress = FILTERS.SHOW_COMPLETED;
    const notActiveFilter = queryByAccessibilityLabel(
      `${FILTERS_TEXT[filterToPress]} button`
    );
    fireEvent.press(notActiveFilter);
    const expectedActions = [{ type: SET_FILTER, filter: filterToPress }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("dispatch clear when pressing clear completed", () => {
    const { queryByAccessibilityRole } = render(component);
    const clearLink = queryByAccessibilityRole("link");
    fireEvent.press(clearLink);
    const expectedActions = [{ type: CLEAR_COMPLETED_TODOS }];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
