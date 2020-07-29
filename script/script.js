let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__submit-button');

let nameOutput = document.querySelector('.profile__title');
let jobOutput = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

let popup = document.querySelector('.popup');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function fillFields(){
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
}

editButton.addEventListener('click', function() {
  togglePopup();
  fillFields();
});

submitButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  nameOutput.textContent = nameValue;
  jobOutput.textContent = jobValue;
}

formElement.addEventListener('submit', formSubmitHandler);
