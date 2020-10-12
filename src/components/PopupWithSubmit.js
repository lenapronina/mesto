import { Popup } from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitAction) {
    super(popupSelector);
    this._submitAction = submitAction;
    this._submitButton = this._popup.querySelector('.popup__submit-button');
  }

  open(elementId, childElement){
    super.open()
    this._elementId = elementId;
    this._childElement = childElement;
  }

  setEventListeners(){
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitAction(this._elementId, this._childElement);
    });
  }
}
