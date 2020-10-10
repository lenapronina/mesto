export const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const myId = "73f3cfeafaaf68c0631ba345";

export const escapeKeyCode = 27;

export const appendMethod = 'append';

export const prependMethod = 'prepend';

export const initialCards = [
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

export const cardsContainer = document.querySelector('.mesto-cards');

export const nameInput = document.querySelector('#name');
export const jobInput = document.querySelector('#job');


export const profileEditButton = document.querySelector('.profile__edit-button');
export const newCardButton = document.querySelector('.profile__add-button');
export const profileAvatarButton = document.querySelector('.profile__avatar');

export const profileForm = document.querySelector('#form-edit');
export const cardForm = document.querySelector('#form-addcard');
export const avatarForm = document.querySelector('#form-editavatar');
