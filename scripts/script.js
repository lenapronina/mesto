const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const profilePopup = document.querySelector('.popup_profile-edit');
const imagePopup = document.querySelector('.popup_image-viewer');
const newCardPopup = document.querySelector('.popup_add-card');

// Select all popups to hide them clicking on overlay
const popups = document.querySelectorAll('.popup');

// Select all closeButtons to hide popups
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const profileForm = document.querySelector('#form-edit');
const cardForm = document.querySelector('#form-addcard');

const placeValue = document.querySelector('#place-name');
const linkValue = document.querySelector('#place-image');

// Template for card
const cardTemplate = document.querySelector('.mesto-template').content;

// Container with cards
const cardsContainer = document.querySelector('.mesto-cards');

//Render card from template with  updated values
function createCard(item){
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.mesto-card__title').textContent = item.name;
  cardElement.querySelector('.mesto-card__image').alt = item.name;
  cardElement.querySelector('.mesto-card__image').src = item.link;

  return cardElement;
}

//Add listeners for opened popup to close by escape key
function closePopupByKeyboard(popupName) {

  //Remove opened class
  const cleanPopupByEscape = (evt) =>{
    if(evt.key ==='Escape'){
      closePopup(popupName);
      evt.target.removeEventListener('keydown', cleanPopupByEscape);
    }
  }

  //Add listener for opened popup
  if(popupName.classList.contains('popup_opened')){
    document.addEventListener('keydown', cleanPopupByEscape);
  }
}

//Open popup by adding class
function openPopup(param) {
  param.classList.add('popup_opened');
}

//Hide popup by removing class
function closePopup(param) {
  param.classList.remove('popup_opened');
}

// Rewriting input fields with values from profile
function fillFields(){
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  enableValidation(formElements);
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


// Render cards from an array
initialCards.forEach(card => {
  cardsContainer.append(createCard(card));
});


profileForm.addEventListener('submit', evt =>{
  // Update profile inputs
  editProfileForm();
  // Toggle profilePopup
  closePopup(profilePopup);
});

cardForm.addEventListener('submit', evt => {
  // Add card to container
  addCardForm();
  // Toggle newCardPopup
  closePopup(newCardPopup);
});


popups.forEach(popup => {
  // Add click listener for each popup
  popup.addEventListener('click', evt => {
    const closestPopup = evt.target.closest('.popup');
    if(evt.target == evt.currentTarget){
      closePopup(closestPopup);
    }
  });
});


popupCloseButtons.forEach(closeButton => {
  closeButton.addEventListener('click', evt => {
    const closestPopup = evt.target.closest('.popup');
    closePopup(closestPopup);
  });
});


document.addEventListener('click', evt => {

  const target = evt.target;
  const closestCard = target.closest('.mesto-card');

  if(target.classList.contains('mesto-card__like')){
    target.classList.toggle('mesto-card__like_active');

  } else if (target.classList.contains('mesto-card__trash')){
    closestCard.remove();

  } else if (target.classList.contains('mesto-card__image')){

    const link = closestCard.querySelector('.mesto-card__image');
    const name = closestCard.querySelector('.mesto-card__title');

    imagePopup.querySelector('.popup__image').src = link.src;
    imagePopup.querySelector('.popup__caption').textContent = name.textContent;
    imagePopup.querySelector('.popup__image').alt = name.textContent;

    openPopup(imagePopup);
    // Add hiding function to opened popup
    closePopupByKeyboard(imagePopup);
  } else if (target.classList.contains('profile__edit-button')){
    fillFields();

    // Validate form before opening popup
    enableValidation(formElements);

    const profileInputs = [nameInput, jobInput];
    //Clean inputs from errors
    for (item of profileInputs) {
      hideInputError (profileForm, item, formElements);
    }

    openPopup(profilePopup);

    // Add hiding function to opened popup
    closePopupByKeyboard(profilePopup);
  } else if (target.classList.contains('profile__add-button')){

    // Reset form inputs
    cardForm.reset()
    // Validate form before opening popup
    enableValidation(formElements);
    const cardInputs = [placeValue, linkValue];

    //Clean inputs from errors
    for (item of cardInputs) {
      hideInputError (cardForm, item, formElements);
    }
    openPopup(newCardPopup);
    // Add hiding function to opened popup
    closePopupByKeyboard(newCardPopup);
  }
});
