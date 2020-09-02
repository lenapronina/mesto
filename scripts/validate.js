// Describe form selectors and classes
const formElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  formEditClass: 'form-edit',
  formAddCardClass: 'form-addcard'
}

// Add span element with error message and change input style
function showInputError (form, inputElement, errorMessage, obj){
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(`${obj.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${obj.errorClass}`);
}

// Remove span element, clear error message and change input style
function hideInputError (form, inputElement, obj){
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(`${obj.inputErrorClass}`);
  errorElement.classList.remove(`${obj.errorClass}`);
  errorElement.textContent = '';
}

// Check Validity for one input
function isValid (form, inputElement, obj){
  const popup = document.querySelector(`${obj.popup}`)
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(form, inputElement, obj);
  }
}

function setEventListeners(form, obj){
  const inputList = Array.from(form.querySelectorAll(`${obj.inputSelector}`));
  const buttonElement = form.querySelector(`${obj.submitButtonSelector}`);

  // Make submit button disabled for first download
  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {
      // Check Validity for all inputs
      isValid(form, inputElement, obj)
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}


// Check ValidityState for all inputs
function hasInvalidInput(inputList, inputElement){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Change submitButton style by adding/removing class
function toggleButtonState (inputList, buttonElement, obj) {

  if (hasInvalidInput(inputList)) {
    //If some of inpupts are invalid make button disabled
    buttonElement.classList.add(`${obj.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  } else {
    // Make active if all are valid
    buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled', true);
  }
};


function enableValidation(obj){
  // Create formList from all forms with right key value
  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));

  formList.forEach((form) => {
    // Add listener for each form
    form.addEventListener('submit', (evt) => {
    // Cancel default behavior
      evt.preventDefault();
    });
    // Call function with input listeners
    setEventListeners(form, obj);
  });
}

enableValidation(formElements);
