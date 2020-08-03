import api from "../lib/api";

const FETCH_TODOS = "FETCH_TODOS";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";

export const fetchTodos = () => async dispatch => {
  const data = await api.fetchTodos();
  const todos = data.filter(todo => todo.userId === 1);
  dispatch({
    type: FETCH_TODOS,
    todos,
  });
};

export const deleteTodo = todoId => async dispatch => {
  dispatch({
    type: DELETE_TODO,
    todoId,
  });
  api.delete(todoId);
};

export const updateTodo = (todoId, payload) => async dispatch => {
  dispatch({
    type: UPDATE_TODO,
    payload,
    todoId,
  });
  api.update(todoId, payload);
};

const initialState = [];

export default todos = (state = initialState, action) => {
  const { type, todos, todoId, payload } = action;
  switch (type) {
    case FETCH_TODOS: {
      return todos;
    }
    case DELETE_TODO: {
      return state.filter(todo => todo.id !== todoId);
    }
    case UPDATE_TODO: {
      return state.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            ...payload,
          };
        }
        return todo;
      });
    }
  }
  return state;
};
