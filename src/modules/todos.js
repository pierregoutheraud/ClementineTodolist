import api from "../lib/api";

const FETCH_TODOS = "FETCH_TODOS";

export const fetchTodos = () => async dispatch => {
  const data = await api.fetchTodos();
  const todos = data;
  // .filter(todo => todo.userId === 1);
  dispatch({
    type: FETCH_TODOS,
    payload: todos,
  });
};

const initialState = [];

export default todos = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TODOS: {
      return payload;
    }
  }
  return state;
};
