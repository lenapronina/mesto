class FormValidator {

  // Pass object with selectors names and formElement value
  constructor(object, formElement) {
   this._formElement = formElement;
   this._inputSelector = object.inputSelector;
   this._submitButtonSelector = object.submitButtonSelector;
   this._inactiveButtonClass = object.inactiveButtonClass;
   this._inputErrorClass = object.inputErrorClass;
   this._errorClass = object.errorClass;
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
      this._showInputError(inputElement, inputElement.validationMessage, this._obj);
    } else {
      this._hideInputError(inputElement, this._obj);
    }
  }

  _hasInvalidInput(inputList, inputElement){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Change submitButton style by adding/removing class
  _toggleButtonState (inputList, buttonElement) {

    if (this._hasInvalidInput(inputList)) {
      //If some of inpupts are invalid make button disabled
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      // Make active if all are valid
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  };

  _setEventListeners(){

    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    // Make submit button disabled for first download
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      this._hideInputError (inputElement)
      inputElement.addEventListener('input', () => {
        // Check Validity for all inputs
        this._isValid(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation(){
    this._formElement.addEventListener('submit', (evt) => {
      // Cancel default behavior
        evt.preventDefault();
    });
    // Call function with input listeners
    this._setEventListeners(this._formElement);
  }
}



