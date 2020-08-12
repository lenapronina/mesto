const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit-button');


const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const popup = document.querySelector('.popup');

const formElement = document.querySelector('.popup__form');


const cardTemplate = document.querySelector('#mesto-card').content;

const cardsContainer = document.querySelector('.mesto-cards');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// create cards from array initialCards
initialCards.forEach( element => {
  const cardElement = cardTemplate.cloneNode(true);

  // use array values for names and images sources
  cardElement.querySelector('.mesto-card__title').textContent = element.name;
  cardElement.querySelector('.mesto-card__image').src = element.link;
  cardElement.querySelector('.mesto-card__image').alt = element.name;

  // add cards to cardsContainer
  cardsContainer.append(cardElement);
})

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

const deleteButtons = document.querySelectorAll('.mesto-card__trash');

deleteButtons.forEach(button => {
  button.addEventListener('click', evt => {
    const eventTarget = evt.target;
    const closestCard = eventTarget.closest('.mesto-card');
    closestCard.remove();
  });
})

