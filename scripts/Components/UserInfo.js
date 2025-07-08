export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._navNameElement = document.querySelector(nameSelector);
    this._navDescriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this._userName = localStorage.getItem("name") || "Welcome on board";
    this._description = localStorage.getItem("description") || "Set a description";
    return { name: this._userName, description: this._description };
  }

  _saveDetails() {
    localStorage.setItem("name", this._userName);
    localStorage.setItem("description", this._description);
  }

  setUserInfo(userDetails) {
    if (userDetails) {
      this._userName = userDetails.name;
      this._description = userDetails.description;
      this._saveDetails();
    }

    const userInfo = this.getUserInfo();

    this._navNameElement.textContent = userInfo.name;
    this._navDescriptionElement.textContent = userInfo.description;
    return userInfo;
  }
}
