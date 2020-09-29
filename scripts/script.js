import Section from './Section.js';
import UserInfo from './UserInfo.js';
import initialCards from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';


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

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');


const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const profileForm = document.querySelector('#form-edit');
const cardForm = document.querySelector('#form-addcard');

const profileFormValidator = new FormValidator(formElements, profileForm);
const cardFormValidator = new FormValidator(formElements, cardForm);

const userProfile = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle'
});

const cardList = new Section({
  items: initialCards,
  renderer:(cardItem) => {
    const card = new Card({
      name: cardItem.name,
      link: cardItem.link,
      handleCardClick: ()=>{
        imagePopup.open( cardItem.name, cardItem.link);
        imagePopup.setEventListeners();
      }
    }, '.mesto-template');
    const cardElement = card.createCard();
    //cardImageListener(cardElement);
    cardList.addItem(cardElement, 'append');
  }
}, cardsContainer);

const profilePopup = new PopupWithForm('.popup_profile-edit', {
  submitForm: (profileValues) =>{

    userProfile.setUserInfo(profileValues.name, profileValues.job);
    profilePopup.close();
  }
})

const imagePopup = new PopupWithImage('.popup_image-viewer');
const newCardPopup = new PopupWithForm ('.popup_add-card', {
  submitForm: (cardProperties)=>{
    const card = new Card({
      name: cardProperties.name,
      link: cardProperties.link,
      handleCardClick: () =>{
        imagePopup.open( cardProperties.name, cardProperties.link);
        imagePopup.setEventListeners();
      }
    }, '.mesto-template');
    const cardElement = card.createCard();

    //Add card to container
    cardList.addItem(cardElement, 'prepend');
    newCardPopup.close();
  }
});

// Rewriting input fields with values from profile
const fillProfileInputs = ()=> {
  const valuesFromProfile = userProfile.getUserInfo()
  nameInput.value = valuesFromProfile.name;
  jobInput.value = valuesFromProfile.job;
}

fillProfileInputs()

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();





cardList.renderItems();

profileEditButton.addEventListener('click', () => {

  fillProfileInputs();
  profilePopup.open();
  profilePopup.setEventListeners();
});

newCardButton.addEventListener('click',() => {
  newCardPopup.open();
  newCardPopup.setEventListeners();
});




