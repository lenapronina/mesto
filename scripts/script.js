import Section from './Section.js';
import UserInfo from './UserInfo.js';
import initialCards from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const formElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Container for cards
const cardsContainer = document.querySelector('.mesto-cards');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const profilePopup = document.querySelector('.popup_profile-edit');
const newCardPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image-viewer');

const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

// Select all popups to hide them clicking on overlay
const popups = document.querySelectorAll('.popup');

// Select all closeButtons to hide popups
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const profileForm = document.querySelector('#form-edit');
const cardForm = document.querySelector('#form-addcard');

const placeValue = document.querySelector('#place-name');
const linkValue = document.querySelector('#place-image');



//Open popup by adding class
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

//Hide popup by removing class
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

//Add listeners for opened popup to close by escape key
function closePopupByKeyboard(popupName) {

  //Remove opened class
  const cleanPopupByEscape = (evt) =>{
    if(evt.key ==='Escape'){
      closePopup(popupName);
      document.removeEventListener('keydown', cleanPopupByEscape);
    }
  }
  //Add listener for opened popup
  if(popupName.classList.contains('popup_opened')){
    document.addEventListener('keydown', cleanPopupByEscape);
  }
}

// Rewriting input fields with values from profile
function fillFields() {
  const valuesFromProfile = userProfile.getUserInfo()
  nameInput.value = valuesFromProfile.name;
  jobInput.value = valuesFromProfile.job;
}

// Fill imagePopup with data from card
function fillImagePopup(cardImage, cardTitle){
  imagePopupPicture.src = cardImage.src;
  imagePopupCaption.textContent = cardTitle.textContent;
  imagePopupPicture.alt = cardTitle.textContent;
}

function cardImageListener(card){

  const cardImage = card.querySelector('.mesto-card__image');
  const cardTitle = card.querySelector('.mesto-card__title');

  cardImage.addEventListener('click', (evt)=>{
    fillImagePopup(cardImage, cardTitle);
    openPopup(imagePopup);
    closePopupByKeyboard(imagePopup);
  })
}


// Rewriting profile data with name and job values from profileForm
function editProfileForm () {

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  userProfile.setUserInfo(nameValue, jobValue)
  // nameProfile.textContent = nameValue;
  // jobProfile.textContent = jobValue;
}


// Add new card with image and title values from cardForm
function addCardForm () {
  // Collect new object from form inputs
  const cardProperties = {
    name: placeValue.value,
    link: linkValue.value
  }
  // Сreate new card instance
  const card = new Card(cardProperties, '.mesto-template');
  const cardElement = card.createCard();

  //Add listener for showing imagePopup
  cardImageListener(cardElement)
  // Add card to container
  cardList.addItem(cardElement, 'prepend');
}

const userProfile = new UserInfo({
  nameSelector: nameProfile,
  infoSelector: jobProfile
});

// Сreate new formvalidator instance
const profileFormValidator = new FormValidator(formElements, profileForm);
const cardFormValidator = new FormValidator(formElements, cardForm);
// Use public method of formvalidator
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();


const cardList = new Section({
  items: initialCards,
  renderer:(cardItem)=>{
    const card = new Card(cardItem, '.mesto-template');
    const cardElement = card.createCard();
    cardImageListener(cardElement);
    cardList.addItem(cardElement, 'append');
  }
}, cardsContainer);

cardList.renderItems();

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

profileEditButton.addEventListener('click', () => {
  fillFields();
  openPopup(profilePopup);
  // Add hiding function to opened popup
  closePopupByKeyboard(profilePopup);
});

newCardButton.addEventListener('click',() => {
  // Reset form inputs
  cardForm.reset();

  openPopup(newCardPopup);
  closePopupByKeyboard(newCardPopup);
});
