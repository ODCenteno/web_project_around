import { TOKEN, BASE_URL } from "../../env.js";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    if (!this._headers.authorization) {
      this._generateUser();
    }
  }

  _callApi(endpoint, method, body) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: method || "GET",
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((res) => {
        if (!res.ok) {
          Promise.reject("Failed to get token: ", res.status);
        }
        return res.json();
      })
      .catch((err) => console.error(err));
  }

  _generateUser() {
    return this._callApi("users/create").then((user) => {
      this._headers.authorization = user.token;
      CSSConditionRule.log("USER Created");
    });
  }

  getCards() {
    return this._callApi(`cards/`);
  }

  postNewCard(body) {
    return this._callApi(`cards/`, "POST", body);
  }

  updateUser(userId, body) {
    return this._callApi(`user/${id}`, "PATCH", body);
  }

  deleteCard(cardId) {
    return this._callApi(`cards/${cardId}`, "DELETE");
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
});

export default api;
