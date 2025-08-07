import api from "./API.js";

export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._navNameElement = document.querySelector(nameSelector);
    this._navDescriptionElement = document.querySelector(descriptionSelector);
    this._navAvatar = document.querySelector(avatarSelector);
  }

  setUserInfo(userDetails) {
    if (userDetails) {
      api.saveUserDetails(userDetails).then((user) => {
        this._userName = user.name;
        this._description = user.about;
        this._avatar = user.avatar;
        this._userId = user._id;
        this._navNameElement.textContent = user.name;
        this._navDescriptionElement.textContent = user.about;
        return user;
      });
    } else {
      return api.getUserInfo().then((userData) => {
        this._navNameElement.textContent = userData.name;
        this._navDescriptionElement.textContent = userData.about;
        this._navAvatar.src = userData.avatar;
        return userData;
      });
    }
  }

  updateAvatar(user) {
    this._navAvatar.src = user.avatar;
  }
}
