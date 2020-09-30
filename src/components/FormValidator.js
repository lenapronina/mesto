export default class FormValidator {

  // Pass object with selectors names and formElement value
  constructor(formParams, formElement) {
   this._formElement = formElement;
   this._inputSelector = formParams.inputSelector;
   this._submitButtonSelector = formParams.submitButtonSelector;
   this._inactiveButtonClass = formParams.inactiveButtonClass;
   this._inputErrorClass = formParams.inputErrorClass;
   this._errorClass = formParams.errorClass;
  }

  // Add span element with error message and change input style
  _showInputError (inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Remove span element, clear error message and change input style
  _hideInputError (inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Check Validity for one input
  _isValid (inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners(){
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    // Make submit button disabled for first download
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // Check Validity for all inputs
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Change submitButton style by adding/removing class
  _toggleButtonState() {

    if (!this._hasInvalidInput()) {
      // Make active if all are valid
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    } else {

      //If some of inpupts are invalid make button disabled
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    }
  };

  enableValidation(){
    this._formElement.addEventListener('submit', (evt) => {
      // Cancel default behavior
        evt.preventDefault();
    });
    // Call function with input listeners
    this._setEventListeners();
  }
}
