let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__submit-button');

let nameOutput = document.querySelector('.profile__title');
let jobOutput = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form');

// Open/hide popup by adding/removing class
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

// Rewriting input fields with values from profile
function fillFields(){
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
}

// Rewriting profile data with input fields + hiding popup
function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  nameOutput.textContent = nameValue;
  jobOutput.textContent = jobValue;

  togglePopup();
}

editButton.addEventListener('click', function() {
  togglePopup();
  fillFields();
});

closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
