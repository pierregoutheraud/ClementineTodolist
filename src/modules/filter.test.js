import filter from "./filter";
import { setFilter, SET_FILTER } from "./filter";
import { FILTERS } from "../constants/filters";

describe("filter actions", () => {
  it("setFilter should create SET_FILTER action", () => {
    expect(setFilter(FILTERS.SHOW_COMPLETED)).toEqual({
      type: SET_FILTER,
      filter: FILTERS.SHOW_COMPLETED,
    });
  });
});

describe("filter reducer", () => {
  it("should handle initial state", () => {
    expect(filter(undefined, {})).toEqual(FILTERS.SHOW_ALL);
  });

  it("should handle SET_FILTER", () => {
    expect(
      filter([], {
        type: SET_FILTER,
        filter: FILTERS.SHOW_COMPLETED,
      })
    ).toEqual(FILTERS.SHOW_COMPLETED);
  });
});
