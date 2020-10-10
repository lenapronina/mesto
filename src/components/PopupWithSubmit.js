import { Popup } from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitAction) {
    super(popupSelector);
    this._submitAction = submitAction;
  }

  setEventListeners(argumentik, elementic){
    super.setEventListeners();
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitAction(argumentik, elementic);
    });
  }
}
