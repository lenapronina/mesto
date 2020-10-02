import './index.css';

import {
  initialCards,
  formSelectors,
  appendMethod,
  prependMethod,
  cardsContainer,
  nameInput,
  jobInput,
  profileEditButton,
  newCardButton,
  profileForm,
  cardForm
} from '../utils/constants.js';

import { createCard } from '../utils/utils.js'

import { Section } from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

// UserInfo instance
const userProfile = new UserInfo('.profile__title', '.profile__subtitle');
// PopupWithImage instance
const imagePopup = new PopupWithImage('.popup_image-viewer');

// Section instance
const cardList = new Section({
  items: initialCards,
  renderer:(cardItem) => {
    cardList.addItem(createCard(cardItem, imagePopup), appendMethod);
  }
}, cardsContainer);

// Set new profile values by submitting form
const sumbitProfileForm = (profileValues) => {
  userProfile.setUserInfo(profileValues.name, profileValues.job);
  profilePopup.close();
}

// Add new Card to cardList by submitting form
const submitNewCard = (cardProperties) => {
  cardList.addItem(createCard(cardProperties, imagePopup), prependMethod);
  newCardPopup.close();
}

// PopupWithForm instance
const profilePopup = new PopupWithForm('.popup_profile-edit', sumbitProfileForm);
// PopupWithForm instance
const newCardPopup = new PopupWithForm ('.popup_add-card', submitNewCard);

// Rewriting input fields with values from userProfile
const fillProfileInputs = () => {
  const valuesFromProfile = userProfile.getUserInfo();
  nameInput.value = valuesFromProfile.name;
  jobInput.value = valuesFromProfile.job;
}

// Fill inputs before first userProfile validation
fillProfileInputs()

// FormValidator instances
const profileFormValidator = new FormValidator(formSelectors, profileForm);
const cardFormValidator = new FormValidator(formSelectors, cardForm);

 // Enable validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Render cards into the cardsContainer
cardList.renderItems();

// Add listeners to all popups
imagePopup.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();

// Add listeners to buttons
profileEditButton.addEventListener('click', () => {
  fillProfileInputs();
  profilePopup.open();
});

newCardButton.addEventListener('click',() => {
  newCardPopup.open();
});
