import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form')
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  close(){
    super.close();
    this._form.reset();
    // this._submitButton = this._form.querySelector('.popup__submit-button');
    // this._submitButton.classList.add('popup__submit-button_disabled');
    // this._submitButton.setAttribute('disabled', true);
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}
