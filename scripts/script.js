const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const submitButton = document.querySelector('.popup__submit-button');

const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const popup = document.querySelector('.popup');
const editProfilePopup = document.querySelector('.popup_profile-edit');
const imageViewerPopup = document.querySelector('.popup_image-viewer');
const addCardPopup = document.querySelector('.popup_add-card');

const formElement = document.querySelector('.popup__form');
const formElementAdd = document.querySelector('#form-addcard');


const cardTemplate = document.querySelector('.mesto-template').content;

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


function addCardtoContainer(placeName, placeLink){

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.mesto-card__title').textContent = placeName;
  cardElement.querySelector('.mesto-card__image').alt = placeName;
  cardElement.querySelector('.mesto-card__image').src = placeLink;

  cardsContainer.prepend(cardElement);
}

initialCards.forEach(card => {
  const cardName = card.name;
  const cardImage = card.link;
  addCardtoContainer(cardName, cardImage)
})

formElement.addEventListener('submit', formSubmitHandler);

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

  togglePopup(editProfilePopup);
}


function addformSubmitHandler (evt) {
  evt.preventDefault();

  const placeValue = document.querySelector('#place-name').value;
  const linkValue = document.querySelector('#place-image').value;

  addCardtoContainer(placeValue, linkValue);
  togglePopup(addCardPopup);
}



editButton.addEventListener('click', () => {
  togglePopup(editProfilePopup);
  fillFields();
});


addButton.addEventListener('click',() => {
  togglePopup(addCardPopup)
});

formElementAdd.addEventListener('submit', addformSubmitHandler);

document.addEventListener('click', evt => {
  const target = evt.target;

  const closestCard = target.closest('.mesto-card');
  const closestPopup = target.closest('.popup');

  if(target.classList.contains('mesto-card__like')){
    target.classList.toggle('mesto-card__like_active');
  } else if (target.classList.contains('mesto-card__trash')){
    closestCard.remove();
  } else if (target.classList.contains('mesto-card__image')){




    let link = closestCard.querySelector('.mesto-card__image');
    let name = closestCard.querySelector('.mesto-card__title');

    imageViewerPopup.querySelector('.popup__image').src = link.src;
    imageViewerPopup.querySelector('.popup__caption').textContent = name.textContent;
    imageViewerPopup.querySelector('.popup__image').alt = name.textContent;

    togglePopup(imageViewerPopup);
  } else if (target.classList.contains('popup__close-button')){
    togglePopup(closestPopup)
  }
})



