import { TOKEN, BASE_URL } from "../../env.js";

export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._navNameElement = document.querySelector(nameSelector);
    this._navDescriptionElement = document.querySelector(descriptionSelector);
  }

  loadUserFromServer() {
    return fetch(`${BASE_URL}users/me`, {
      headers: {
        authorization: TOKEN,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP Error: ", res.status);
        }
        return res.json();
      })
      .catch((error) => console.error(error));
  }

  getUserInfo() {
    return this.loadUserFromServer()
      .then((user) => {
        console.log(user);
        this._userName = localStorage.getItem("name") || user.name;
        this._description = localStorage.getItem("about") || user.about;
        this._avatar = user.avatar;
        this._userId = user._id;
        return { name: this._userName, description: this._description };
      }
      .catch((error) => {
        console.error(error);
        return { name: "", description: "" };
      });
  }

  _saveDetails() {
    localStorage.setItem("name", this._userName);
    localStorage.setItem("about", this._description);
  }

  setUserInfo(userDetails) {
    if (userDetails) {
      this._userName = userDetails.name;
      this._description = userDetails.description;
      this._saveDetails();
    }

    return this.getUserInfo().then((userData) => {
      this._navNameElement.textContent = userData.name;
      this._navDescriptionElement.textContent = userData.description;
      return userData;
    });
  }
}
