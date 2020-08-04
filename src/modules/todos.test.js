import todos from "./todos";
import {
  FETCH_TODOS,
  DELETE_TODO,
  UPDATE_TODO,
  CREATE_TODO,
  CLEAR_COMPLETED_TODOS,
} from "./todos";

describe("todos reducer", () => {
  it("should handle initial state", () => {
    expect(todos(undefined, {})).toEqual([]);
  });

  it("should handle FETCH_TODOS", () => {
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

  it("should handle CREATE_TODO", () => {
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

  it("should handle DELETE_TODO", () => {
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

  it("should handle UPDATE_TODO", () => {
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

  it("should handle CLEAR_COMPLETED_TODOS", () => {
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
