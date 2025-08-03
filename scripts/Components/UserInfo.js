import { TOKEN, BASE_URL } from "../../env.js";

export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._navNameElement = document.querySelector(nameSelector);
    this._navDescriptionElement = document.querySelector(descriptionSelector);
    this._navAvatar = document.querySelector(avatarSelector);
  }

  _saveUserInServer(userDetails) {
    return fetch(`${BASE_URL}users/me`, {
      method: "PATCH",
      headers: {
        authorization: TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userDetails.name,
        about: userDetails.description,
      }),
    }).then((res) => res.json());
  }

  _loadUserFromServer() {
    return fetch(`${BASE_URL}users/me`, {
      headers: {
        authorization: TOKEN,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP Error: ", res.status, res.text());
        }
        return res.json();
      })
      .catch((error) => console.error(error));
  }

  getUserInfo() {
    return this._loadUserFromServer()
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.error(error);
        return { name: "", description: "" };
      });
  }

  setUserInfo(userDetails) {
    if (userDetails) {
      this._navNameElement.textContent = userDetails.name;
      this._navDescriptionElement.textContent = userDetails.description;

      this._saveUserInServer(userDetails)
        .then((user) => {
          return user;
        })
        .then((user) => {
          this._userName = user.name;
          this._description = user.about;
          this._avatar = user.avatar;
          this._userId = user._id;
          return user;
        });
    } else {
      return this.getUserInfo().then((userData) => {
        this._navNameElement.textContent = userData.name;
        this._navDescriptionElement.textContent = userData.about;
        this._navAvatar.src = userData.avatar;
        return userData;
      });
    }
  }
}
