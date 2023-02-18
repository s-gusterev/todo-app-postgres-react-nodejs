class RestApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => {
      throw { statusCode: data.statusCode, message: data.message };
    });
  }

  _fetchData(endpoint, options = {}) {
    const url = this.baseUrl + endpoint;
    return fetch(url, options).then(this._checkResponse);
  }

  getUser(token) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
    };
    return this._fetchData('/user', options);
  }

  getTasks(token) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
    };
    return this._fetchData('/todos', options);
  }

  post(endpoint, data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return this._fetchData(endpoint, options);
  }

  postTasks(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data),
    };
    return this._fetchData('/todos', options);
  }

  putTasks(id, data, token) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };
    return this._fetchData(`/todos/${id}`, options);
  }

  deleteTasks(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
    };
    return this._fetchData(`/todos/${id}`, options);
  }

  login(data) {
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return this._fetchData('/login', options);
  }

  signup(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return this._fetchData('/signup', options);
  }

  put(endpoint, data) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return this._fetchData(endpoint, options);
  }
}

const api = new RestApi(import.meta.env.VITE_SERVERURL);
// const api = new RestApi('http://localhost:3003/todo-app');

export { api };
