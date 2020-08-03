import api from "../lib/api";

const FETCH_TODOS = "FETCH_TODOS";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const CREATE_TODO = "CREATE_TODO";

export const fetchTodos = () => async dispatch => {
  const data = await api.fetchTodos();
  const todos = data.filter(todo => todo.userId === 1);
  return dispatch({
    type: FETCH_TODOS,
    todos,
  });
};

export const deleteTodo = todoId => async dispatch => {
  dispatch({
    type: DELETE_TODO,
    todoId,
  });
  return api.delete(todoId);
};

export const updateTodo = (todoId, payload) => async dispatch => {
  dispatch({
    type: UPDATE_TODO,
    payload,
    todoId,
  });
  return api.update(todoId, payload);
};

export const createTodo = payload => async dispatch => {
  const newTodo = await api.create(payload);
  // The fake api always returns an id of 201 so I create a random id here
  return dispatch({
    type: CREATE_TODO,
    todo: {
      ...payload,
      ...newTodo,
      id: "" + Math.random() + Date.now(),
    },
  });
};

const initialState = [];

export default todos = (state = initialState, action) => {
  const { type, todo, todos, todoId, payload } = action;
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
    case CREATE_TODO: {
      return [todo, ...state];
    }
  }
  return state;
};
