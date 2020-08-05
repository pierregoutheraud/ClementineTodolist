import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import todos from "./todos";
import {
  fetchTodos,
  deleteTodo,
  updateTodo,
  createTodo,
  clearCompletedTodos,
  FETCH_TODOS,
  DELETE_TODO,
  UPDATE_TODO,
  CREATE_TODO,
  CLEAR_COMPLETED_TODOS,
} from "./todos";
import { FILTERS } from "../constants/filters";
jest.mock("../lib/api");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("todos actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  test("fetchTodos should create FETCH_TODOS action", () => {
    return store.dispatch(fetchTodos()).then(actionResponse => {
      expect(actionResponse).toEqual({
        type: "FETCH_TODOS",
        todos: [
          { id: 1, title: "Title1", completed: false, userId: 1 },
          { id: 2, title: "Title2", completed: false, userId: 1 },
        ],
      });
    });
  });

  test("deleteTodo should create DELETE_TODO action", () => {
    const expectedActions = [{ type: DELETE_TODO, todoId: 1 }];
    return store.dispatch(deleteTodo(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("createTodo should create UPDATE_TODO action", () => {
    const expectedActions = [
      {
        type: UPDATE_TODO,
        todoId: 1,
        payload: {
          title: "NewTitle1",
        },
      },
    ];
    return store.dispatch(updateTodo(1, { title: "NewTitle1" })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("createTodo should create CREATE_TODO action", () => {
    return store.dispatch(createTodo({ title: "Title1" })).then(() => {
      const actions = store.getActions();
      // Make sure we create todo first and the update it with new id from api
      expect(actions[0].type).toEqual(CREATE_TODO);
      expect(actions[0].todo.id).toEqual(actions[1].todoId);
      expect(actions[1].type).toEqual(UPDATE_TODO);
      expect(actions[1].payload.id).toBeDefined();
      expect(actions[1].payload.id.includes("201")).toEqual(true);
    });
  });

  test("clearCompletedTodos should create CLEAR_COMPLETED_TODOS action", () => {
    const store = mockStore({
      filter: FILTERS.SHOW_ALL,
      todos: [],
    });
    const expectedActions = [{ type: CLEAR_COMPLETED_TODOS }];
    return store.dispatch(clearCompletedTodos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("todos reducer", () => {
  test("should handle initial state", () => {
    expect(todos(undefined, {})).toEqual([]);
  });

  test("should handle FETCH_TODOS", () => {
    expect(
      todos([], {
        type: FETCH_TODOS,
        todos: [
          {
            id: 2,
            title: "Title2",
            completed: true,
          },
          {
            id: 1,
            title: "Title1",
            completed: false,
          },
        ],
      })
    ).toEqual([
      {
        id: 2,
        title: "Title2",
        completed: true,
      },
      {
        id: 1,
        title: "Title1",
        completed: false,
      },
    ]);
  });

  test("should handle CREATE_TODO", () => {
    expect(
      todos([], {
        type: CREATE_TODO,
        todo: {
          id: 1,
          title: "Title1",
          completed: false,
        },
      })
    ).toEqual([
      {
        id: 1,
        title: "Title1",
        completed: false,
      },
    ]);

    expect(
      todos(
        [
          {
            id: 1,
            title: "Title1",
            completed: false,
          },
        ],
        {
          type: CREATE_TODO,
          todo: {
            id: 2,
            title: "Title2",
            completed: true,
          },
        }
      )
    ).toEqual([
      {
        id: 2,
        title: "Title2",
        completed: true,
      },
      {
        id: 1,
        title: "Title1",
        completed: false,
      },
    ]);

    expect(
      todos(
        [
          {
            id: 1,
            title: "Title1",
            completed: false,
          },
          {
            id: 2,
            title: "Title2",
            completed: false,
          },
        ],
        {
          type: CREATE_TODO,
          todo: {
            id: 3,
            title: "Title3",
            completed: true,
          },
        }
      )
    ).toEqual([
      {
        id: 3,
        title: "Title3",
        completed: true,
      },
      {
        id: 1,
        title: "Title1",
        completed: false,
      },
      {
        id: 2,
        title: "Title2",
        completed: false,
      },
    ]);
  });

  test("should handle DELETE_TODO", () => {
    expect(
      todos(
        [
          {
            id: 1,
            title: "Title1",
            completed: false,
          },
          {
            id: 2,
            title: "Title2",
            completed: false,
          },
        ],
        {
          type: DELETE_TODO,
          todoId: 1,
        }
      )
    ).toEqual([
      {
        id: 2,
        title: "Title2",
        completed: false,
      },
    ]);
  });

  test("should handle UPDATE_TODO", () => {
    expect(
      todos(
        [
          {
            id: 1,
            title: "Title1",
            completed: false,
          },
          {
            id: 2,
            title: "Title2",
            completed: false,
          },
        ],
        {
          type: UPDATE_TODO,
          todoId: 1,
          payload: {
            title: "NewTitle1",
            completed: true,
          },
        }
      )
    ).toEqual([
      {
        id: 1,
        title: "NewTitle1",
        completed: true,
      },
      {
        id: 2,
        title: "Title2",
        completed: false,
      },
    ]);
  });

  test("should handle CLEAR_COMPLETED_TODOS", () => {
    expect(
      todos(
        [
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
          {
            id: 3,
            title: "Title3",
            completed: true,
          },
        ],
        {
          type: CLEAR_COMPLETED_TODOS,
        }
      )
    ).toEqual([
      {
        id: 1,
        title: "Title1",
        completed: false,
      },
    ]);
  });
});
