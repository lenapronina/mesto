export default class UserInfo {
  constructor(nameSelector, infoSelector){
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
  }

  getUserInfo(){
    return {
      name: this._nameSelector.textContent,
      job: this._infoSelector.textContent
    }
  }

  setUserInfo(updatedName, updatedInfo){
    this._nameSelector.textContent = updatedName;
    this._infoSelector.textContent = updatedInfo;
  }
}
