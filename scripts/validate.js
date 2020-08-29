// Describe form selectors and classes
const formElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  popup: '.popup',
  popupOpened: 'popup_opened'
}

const showInputError = (form, inputElement, errorMessage, obj) => {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(`${obj.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${obj.errorClass}`);
};

const hideInputError = (form, inputElement, obj) => {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(`${obj.inputErrorClass}`);
  errorElement.classList.remove(`${obj.errorClass}`);
  errorElement.textContent = '';
};

const resetForm = (form, obj) => {
  form.reset();
  const inputs = form.querySelectorAll(`${obj.inputSelector}`);
  inputs.forEach(input => {
    input.classList.remove(`${obj.inputErrorClass}`);
  })
  const errors = form.querySelectorAll(`.${obj.errorClass}`);
  errors.forEach(error => {
    error.classList.remove(`${obj.errorClass}`);
    error.textContent = '';
  })
}
const isValid = (form, inputElement, obj) => {

const popup = document.querySelector(`${obj.popup}`)
if (!inputElement.validity.valid) {
  showInputError(form, inputElement, inputElement.validationMessage, obj);
} else {
  hideInputError(form, inputElement, obj);
}
};

const setEventListeners = (form, obj) => {

  const inputList = Array.from(form.querySelectorAll(`${obj.inputSelector}`));

  const buttonElement = form.querySelector(`${obj.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      isValid(form, inputElement, obj)
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};



const hasInvalidInput = (inputList, inputElement) => {

  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, obj) => {

  if (hasInvalidInput(inputList)) {

    buttonElement.classList.add(`${obj.inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {

    buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
};


const enableValidation = (obj) => {

  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form, obj);
  });
};

