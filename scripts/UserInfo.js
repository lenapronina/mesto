export default class UserInfo {
  constructor({nameSelector, infoSelector}){
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
    this._infoFromProfile;
  }

  getUserInfo(){
    return this._infoFromProfile = {
      name: this._nameSelector.textContent,
      job: this._infoSelector.textContent
    }
  }

  setUserInfo(updatedName, updatedInfo){
    this._nameSelector.textContent = updatedName;
    this._infoSelector.textContent = updatedInfo;
  }
}
