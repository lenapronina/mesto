const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit-button');

const closeButtonImage = document.querySelector('.popup__close-button_type_image');


const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_profile-edit');
const popupImageViewer = document.querySelector('.popup_image-viewer');

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
initialCards.forEach( card => {
  const cardElement = cardTemplate.cloneNode(true);

  // use array values for names and images sources
  cardElement.querySelector('.mesto-card__title').textContent = card.name;
  cardElement.querySelector('.mesto-card__image').src = card.link;
  cardElement.querySelector('.mesto-card__image').alt = card.name;


  const deleteButton = cardElement.querySelector('.mesto-card__trash');


  deleteButton.addEventListener('click', evt => {
    const eventTarget = evt.target;
    const closestCard = eventTarget.closest('.mesto-card');
    closestCard.remove();
  });

  const likeButton = cardElement.querySelector('.mesto-card__like');


  likeButton.addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('mesto-card__like_active');
  });


  const cardImage = cardElement.querySelector('.mesto-card__image');
  cardImage.addEventListener('click',() => {
    popupImageViewer.querySelector('.popup__image').src = card.link;
    popupImageViewer.querySelector('.popup__caption').textContent = card.name;
    popupImageViewer.querySelector('.popup__image').alt = card.name;
    togglePopup(popupImageViewer);

  });

  closeButtonImage.addEventListener('click', function() {
    popupImageViewer.classList.remove('popup_opened');
   });
  // add cards to cardsContainer
  cardsContainer.append(cardElement);
})

// Open/hide popup by adding/removing class
function togglePopup(param) {
  param.classList.toggle('popup_opened');
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

  togglePopup(popupEdit);
}

editButton.addEventListener('click', function() {
  togglePopup(popupEdit);
  fillFields();
});




formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', () => {
  togglePopup(popup);
});

