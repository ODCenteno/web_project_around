import { BASE_URL, TOKEN } from "../../env.js";

class Api {
  constructor(apiDetails) {
    this._baseUrl = apiDetails.baseUrl;
    this._headers = apiDetails.headers;
  }

  _callApi(endpoint, method, body) {
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

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
});

export default api;
