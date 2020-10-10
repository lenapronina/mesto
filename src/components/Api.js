import { checkResStatus } from '../utils/utils.js';

class Api {
  constructor({baseUrl, headers}){
    this._baseURL = baseUrl;
    this._headers = headers
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers
    })
    .then((res) => checkResStatus(res));
  }

  getUserInfo(){
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers
    })
    .then((res) => checkResStatus(res));
  }

  getAllInitialData(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  patchUserAvatar(updatedData){
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: updatedData.avatar
      })
    })
    .then((res) => checkResStatus(res));
  }

  patchUpdatedUserInfo(updatedData){
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: updatedData.name,
        about: updatedData.job
      })
    })
    .then((res) => checkResStatus(res));
  }

  addLike(cardId){
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => checkResStatus(res));
  }

  deleteLike(cardId, card){
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => checkResStatus(res));
  }

  deleteCard(cardId, card){
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => checkResStatus(res));
  }

  postNewCard(cardData){
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then((res) => checkResStatus(res));
  }
}

export { Api };
