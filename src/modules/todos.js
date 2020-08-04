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
    todoId,
    payload,
  });

  try {
    await api.update(todoId, payload);
  } catch (e) {
    console.log(
      "Error because we try to update a todo id the API does not have. See README."
    );
  }
};

export const createTodo = payload => async dispatch => {
  /*
  I create the todo with a temporary id and before the call to the api
  so that it seems instant for the user.
  */
  const tempId = Math.random() + "_" + Date.now();
  dispatch({
    type: CREATE_TODO,
    todo: {
      ...payload,
      id: tempId,
    },
  });

  try {
    const newTodo = await api.create(payload);
    dispatch({
      type: UPDATE_TODO,
      todoId: tempId,
      payload: {
        id: newTodo.id + "_" + Date.now(), // I should not use Date.now() here, but the fake api always returns an id of 201 so I have to in order to randomize it. See README.
      },
    });
  } catch (e) {
    // In case there is an error with the call, we delete the todo
    dispatch({
      type: DELETE_TODO,
      todoId: tempId,
    });
  }
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
