class API {
  fetchTodos = () => {
    return Promise.resolve([
      {
        id: 1,
        title: "Title1",
        completed: false,
        userId: 1,
      },
      {
        id: 2,
        title: "Title2",
        completed: false,
        userId: 1,
      },
    ]);
  };

  create(data = {}) {
    return Promise.resolve({
      ...data,
      id: 201,
    });
  }

  update(id, data = {}) {
    return Promise.resolve(data);
  }

  delete(id) {
    return Promise.resolve({});
  }

  deleteTodos(todos) {
    return Promise.resolve([]);
  }
}

export default new API();
