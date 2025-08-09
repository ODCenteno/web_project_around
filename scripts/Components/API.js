import { BASE_URL, TOKEN } from "../../../dist/env.js";

class Api {
  static instance = null;
  constructor(apiDetails) {
    if (Api.instance) {
      return Api.instance;
    }
    this._baseUrl = apiDetails.baseUrl;
    this._headers = apiDetails.headers;
    this._initialized = false;
    this._initializationPromise = null;

    if (!this._headers.authorization) {
      this._generateUser();
    } else {
      this._initialized = true;
      this._initializationPromise = Promise.resolve();
    }
    Api.instance = this;
  }

  _callApi(endpoint, method, body) {
    const execution = this._initialized ? Promise.resolve() : this._generateUser();

    return execution.then(() => {
      return fetch(`${this._baseUrl}${endpoint}`, {
        method: method || "GET",
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
      })
        .then((res) => {
          if (!res.ok) {
            Promise.reject("Failed to fetch: ", res.statusText);
          }
          return res.json();
        })
        .catch((err) => console.error(err));
    });
  }

  _generateUser() {
    return fetch(`${BASE_URL}users/create`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error getting User information", res.status);
        }
      })
      .then((user) => {
        this._headers = {
          authorization: user.token,
          "Content-Type": "application/json",
        };
        localStorage.setItem("apiToken", user.token);
        return user;
      })
      .catch((error) => {
        console.error("Error al crear usuario:", error);
        throw error;
      });
  }

  static getInstance(options) {
    if (!Api.instance) {
      Api.instance = new Api(options);
    }
    return Api.instance;
  }

  getUserInfo() {
    return this._callApi("users/me")
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.error(error);
        return { name: "", description: "" };
      });
  }

  saveUserDetails(userDetails) {
    return this._callApi("users/me", "PATCH", {
      name: userDetails.name,
      about: userDetails.description,
    });
  }

  saveAvatar(avatar) {
    return this._callApi("users/me/avatar", "PATCH", avatar);
  }

  getCards() {
    return this._callApi(`cards/`);
  }

  postNewCard(body) {
    return this._callApi(`cards/`, "POST", body);
  }

  updateUser(userId, body) {
    return this._callApi(`user/${userId}`, "PATCH", body);
  }

  deleteCard(cardId) {
    return this._callApi(`cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this._callApi(`/cards/${cardId}/likes`, "PUT");
  }

  removeLike(cardId) {
    return this._callApi(`/cards/${cardId}/likes`, "DELETE");
  }
}

const api = Api.getInstance({
  baseUrl: BASE_URL,
  headers: {
    authorization: localStorage.getItem("apiToken") || TOKEN,
    "Content-Type": "application/json",
  },
});

export default api;
