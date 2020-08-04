import { FILTERS } from "../constants/filters";

const SET_FILTER = "SET_FILTER";

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter,
  };
}

const initialState = FILTERS.SHOW_ALL;

export default filter = (state = initialState, action) => {
  const { type, filter } = action;
  switch (type) {
    case SET_FILTER: {
      return filter;
    }
  }
  return state;
};
