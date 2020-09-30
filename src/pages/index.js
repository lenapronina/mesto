import './index.css';

import {
  initialCards,
  formElements,
  cardsContainer,
  nameInput,
  jobInput,
  profileEditButton,
  newCardButton,
  profileForm,
  cardForm
} from '../utils/constants.js';

import { createCard } from '../utils/utils.js'

import Section from '../components/Section.js';
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
    cardList.addItem(createCard(cardItem, imagePopup), 'append');
  }
}, cardsContainer);

// PopupWithForm instance
const profilePopup = new PopupWithForm('.popup_profile-edit', {
  // Send values from fields into userProfile by submitting form
  submitForm: (profileValues) =>{
    userProfile.setUserInfo(profileValues.name, profileValues.job);
    profilePopup.close();
  }
});

// PopupWithForm instance
const newCardPopup = new PopupWithForm ('.popup_add-card', {
  // Create new card with data from form inputs
  submitForm: (cardProperties) => {
    cardList.addItem(createCard(cardProperties, imagePopup), 'prepend');
    newCardPopup.close();
  }
});

// Rewriting input fields with values from userProfile
const fillProfileInputs = () => {
  const valuesFromProfile = userProfile.getUserInfo();
  nameInput.value = valuesFromProfile.name;
  jobInput.value = valuesFromProfile.job;
}

// FormValidator instances
const profileFormValidator = new FormValidator(formElements, profileForm);
const cardFormValidator = new FormValidator(formElements, cardForm);


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
  // Enable validation
  profileFormValidator.enableValidation();
});

newCardButton.addEventListener('click',() => {
  newCardPopup.open();
  // Enable validation
  cardFormValidator.enableValidation();
});
