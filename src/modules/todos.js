const FETCH_TODOS = "FETCH_TODOS";

export const fetchTodos = () => async dispatch => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
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
