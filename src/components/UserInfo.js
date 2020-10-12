export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector){
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // set inital userInfo
  setUserInfo({name, about, avatar}){
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }

  getUserInfo(){
    return {
      name: this._name.textContent,
      job: this._info.textContent
    }
  }

  updateAvatar({avatar}){
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }

  updateUserInfo({name, about}){
    this._name.textContent = name;
    this._info.textContent = about;
  }
}
