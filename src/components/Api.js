class Api {
  constructor({baseUrl, headers}){
    this._baseURL = baseUrl;
    this._headers = headers
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo(){
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getAllInitialData(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }
}

export { Api };
