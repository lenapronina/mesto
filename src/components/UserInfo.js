export default class UserInfo {
  constructor(nameSelector, infoSelector, avatar){
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo(){
    return {
      name: this._nameSelector.textContent,
      job: this._infoSelector.textContent
    }
  }

  setUserInfo({name, about, avatar}){
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
