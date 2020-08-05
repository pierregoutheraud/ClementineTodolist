import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import TodosList from "./TodosList";
import Todo from "../Todo/Todo";

const todos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },

  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: true,
  },
];

const render = () => {
  const props = {
    todos,
  };

  const renderer = createRenderer();
  renderer.render(<TodosList {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("components", () => {
  test("should render todos", () => {
    const { output } = render();

    const todosChildren = output.props.children.props.children;
    expect(todosChildren.length).toBe(2);
    todosChildren.forEach((todo, i) => {
      expect(todo.type).toBe(Todo);
      expect(Number(todo.key)).toBe(todos[i].id);
      expect(todo.props.todo).toBe(todos[i]);
    });
  });
});
