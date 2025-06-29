export default class UserInfor {
  constructor({ name, description }) {
    this._userName = name;
    this._description = description;
  }

  getUserInfo() {
    return { name: this._userName, job: this._description };
  }

  setUserInfo() {
    // toma los datos del nuevo usuario y los agrega en la página.
  }
}
