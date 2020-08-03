class API {
  url = "https://jsonplaceholder.typicode.com/todos";

  fetchTodos = () => {
    return this.call("GET", "");
  };

  create(endpoint, data = {}) {
    return this.call("POST", endpoint, data);
  }

  update(id, data = {}) {
    return this.call("PUT", `/${id}`, data);
  }

  delete(id) {
    return this.call("DELETE", `/${id}`);
  }

  async call(method = "GET", endpoint, data = null) {
    console.log("API CALL", method, endpoint, data);

    const url = this.url + endpoint;

    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...(data && { body: JSON.stringify(data) }),
    });

    return res.json();
  }
}

export default new API();
