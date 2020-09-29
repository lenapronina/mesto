export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
  }

  open(){
    this._popup.classList.add('popup_opened');
  }

  close(){
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (event) =>{
    if(event.key ==='Escape'){
      this.close();
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }

  setEventListeners(){
    const closePopupButton = this._popup.querySelector('.popup__close-button');
    closePopupButton.addEventListener('click', ()=>{
      this.close();
    });

    this._popup.addEventListener('click', event => {
      if(event.target == event.currentTarget){
        this.close();
      }
    });

    document.addEventListener('keydown', this._handleEscClose);
  }
}
