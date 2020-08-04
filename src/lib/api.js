class API {
  url = "https://jsonplaceholder.typicode.com/todos";

  fetchTodos = () => {
    return this.call("GET", "");
  };

  create(data = {}) {
    return this.call("POST", "", data);
  }

  update(id, data = {}) {
    return this.call("PUT", `/${id}`, data);
  }

  delete(id) {
    return this.call("DELETE", `/${id}`);
  }

  deleteTodos(todos) {
    /*
      Concurrent calls to delete
      Could also be done in sequential in case too many to delete at the same time
    */
    return Promise.all(
      todos.map(todo => {
        return this.delete(todo.id);
      })
    );
  }

  async call(method = "GET", endpoint, data = null) {
    console.log("API CALL", method, endpoint, data);

    const url = this.url + endpoint;

    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      ...(data && { body: JSON.stringify(data) }),
    });

    if (res.status === 500) {
      throw new Error(res.status);
    }

    return res.json();
  }
}

export default new API();
