const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const profilePopup = document.querySelector('.popup_profile-edit');
const imagePopup = document.querySelector('.popup_image-viewer');
const newCardPopup = document.querySelector('.popup_add-card');

const profileForm = document.querySelector('#form-edit');
const cardForm = document.querySelector('#form-addcard');

const placeValue = document.querySelector('#place-name');
const linkValue = document.querySelector('#place-image');

// Template for card
const cardTemplate = document.querySelector('.mesto-template').content;

// Container with cards
const cardsContainer = document.querySelector('.mesto-cards');

//Render card from template with  updated values
function createCard (item){
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.mesto-card__title').textContent = item.name;
  cardElement.querySelector('.mesto-card__image').alt = item.name;
  cardElement.querySelector('.mesto-card__image').src = item.link;

  return cardElement
}

// Open/hide popup by adding/removing class
function togglePopup(param) {
  param.classList.toggle('popup_opened');
  popupName = param
//Add listeners for opened popup to manage with escape key
  if(param.classList.contains('popup_opened')){
    document.addEventListener('keydown', closePopupKeyboard);
  } else {
    document.removeEventListener('keydown', closePopupKeyboard);
  }
}

//Function to close popup with escape key
function closePopupKeyboard(evt) {
  if (evt.key  === "Escape") {
    togglePopup(popupName)
  };
}

// Rewriting input fields with values from profile
function fillFields(){
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

// Rewriting profile data with name and job values from profileForm
function editProfileForm () {
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;
}

// Add new card with image and title values from cardForm
function addCardForm () {

  // Collect new object from form inputs
  const cardObject = {
    name: placeValue.value,
    link: linkValue.value
  }
  //Add new card to card list
  cardsContainer.prepend(createCard(cardObject));
}

//Render cards from an array
initialCards.forEach(card => {
  cardsContainer.append(createCard(card));
});

// Listeners

profileForm.addEventListener('submit', evt =>{
  evt.preventDefault();
  editProfileForm();
  togglePopup(profilePopup);
});

cardForm.addEventListener('submit', evt => {
  evt.preventDefault();
  addCardForm();
  togglePopup(newCardPopup);
  cardForm.reset();
});

document.addEventListener('click', evt => {

  const target = evt.target;

  const closestCard = target.closest('.mesto-card');
  const closestPopup = target.closest('.popup');


  if(target.classList.contains('mesto-card__like')){
    target.classList.toggle('mesto-card__like_active');
  }
    else if (target.classList.contains('mesto-card__trash')){
    closestCard.remove();

  } else if (target.classList.contains('mesto-card__image')){

    const link = closestCard.querySelector('.mesto-card__image');
    const name = closestCard.querySelector('.mesto-card__title');

    imagePopup.querySelector('.popup__image').src = link.src;
    imagePopup.querySelector('.popup__caption').textContent = name.textContent;
    imagePopup.querySelector('.popup__image').alt = name.textContent;

    togglePopup(imagePopup);

  } else if (target.classList.contains('profile__edit-button')){
    fillFields();

    togglePopup(profilePopup);
  } else if (target.classList.contains('profile__add-button')){
    togglePopup(newCardPopup);
  } else if (target.classList.contains('popup__close-button')){
    togglePopup(closestPopup);
  } else if (target.classList.contains('popup')){
    togglePopup(closestPopup);
  }
});


