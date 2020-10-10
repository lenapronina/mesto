import './index.css';

import {
  initialCards,
  formSelectors,
  myId,
  appendMethod,
  prependMethod,
  cardsContainer,
  nameInput,
  jobInput,
  profileEditButton,
  newCardButton,
  profileAvatarButton,
  profileForm,
  cardForm,
  avatarForm
} from '../utils/constants.js';

import { Api } from '../components/Api.js'

//import { createCard } from '../utils/utils.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const submitButton = document.querySelector('.popup__submit-button-avatar')

const profileFormValidator = new FormValidator(formSelectors, profileForm);
const cardFormValidator = new FormValidator(formSelectors, cardForm);
const avatarFormValidator = new FormValidator(formSelectors, avatarForm);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'fba2c732-c582-4b59-a665-759f5dbd039a',
    'Content-Type': 'application/json'
  }
});

const submitAction =(id, button)=>{
  console.log(button)
  api.deleteCard(id)
    .then(()=> {
      button.parentElement.remove()
    })
}

const popupWithSubmit = new PopupWithSubmit('.popup_submit-action', submitAction);



function renderLoading(isLoading, initialText){
  if(isLoading){
    submitButton.textContent = 'Сохранение...';
    console.log('сохранение')
  } else {
    submitButton.textContent = initialText;
  }
}

const selectCardType = (cardData) =>{
  if(cardData.owner._id == myId){
    return '.mesto-template_removable';
  } else {
    return '.mesto-template';
  }
}

const createCard = (cardParams, popupWithImage) => {

  const card = new Card(cardParams, {
    handleLikeClick:(like)=>{
      api.addLike(cardParams._id)
        .then((data)=>{
          // if(data.some(()=>{

          // }))
          like.classList.add('mesto-card__like-icon_active');
          console.log(data.likes)
        })
    },
    handleCardClick: () =>{
      popupWithImage.open( cardParams.name, cardParams.link);
    },
    handleDeleteClick: (element)=> {
      console.log(element)
      popupWithSubmit.open();
      popupWithSubmit.setEventListeners(cardParams._id, element);
    }
  }, selectCardType(cardParams));
  return card.createCard();
}
// PopupWithImage instance
const imagePopup = new PopupWithImage('.popup_image-viewer');



// UserInfo instance
const userProfile = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

api.getAllInitialData()
  .then((data) => {
    const [ initialCardsList, userProfileData] = data;
    const cardList = new Section({
      items: initialCardsList,
      renderer:(cardItem) => {
        cardList.addItem(createCard(cardItem, imagePopup), appendMethod);
      }
    }, cardsContainer);
    cardList.renderItems();

    userProfile.setInitialInfo(userProfileData);
    return cardList;
  })
  .then((cardList) =>{







    const sumbitProfileForm = (profileValues) => {
      api.patchUpdatedUserInfo(profileValues)
        .then((json)=> {
          userProfile.setInitialInfo(json);
        })
      .catch((err) => {console.log(err)});

      profilePopup.close();
    }

    const sumbitAvatarForm = (avatarValue) => {
      renderLoading(true, 'Сохранить');
      api.patchUserAvatar(avatarValue)
        .then((json)=> {
          console.log('2121')
          userProfile.setInitialInfo(json);
          avatarPopup.close();
        })
      .catch((err) => {console.log(err)})
      .finally(()=>{
        renderLoading(false, 'Сохранить');
      });
    }

    const submitNewCard = (cardProperties) => {
      api.postNewCard(cardProperties)
        .then((cardProperties) => {
          cardList.addItem(createCard(cardProperties, imagePopup), prependMethod);
          newCardPopup.close();
        })
        .catch((err) => {console.log(err)});
    }

    // PopupWithForm instance
const profilePopup = new PopupWithForm('.popup_profile-edit', sumbitProfileForm);
// PopupWithForm instance
const newCardPopup = new PopupWithForm ('.popup_add-card', submitNewCard);

const avatarPopup = new PopupWithForm('.popup_avatar-update', sumbitAvatarForm);
// Rewriting input fields with values from userProfile
const fillProfileInputs = () => {
  const valuesFromProfile = userProfile.getUserInfo();
  nameInput.value = valuesFromProfile.name;
  jobInput.value = valuesFromProfile.job;
}

// Fill inputs before first userProfile validation
fillProfileInputs()

// FormValidator instances


 // Enable validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Render cards into the cardsContainer


// Add listeners to all popups
imagePopup.setEventListeners();
profilePopup.setEventListeners();
newCardPopup.setEventListeners();
avatarPopup.setEventListeners();

// Add listeners to buttons
profileEditButton.addEventListener('click', () => {
  fillProfileInputs();
  profilePopup.open();
});

newCardButton.addEventListener('click',() => {
  newCardPopup.open();
});

profileAvatarButton.addEventListener('click', ()=>{
  avatarPopup.open();
});
  })
  .catch((err) => {console.log(err)});






// Section instance
// api.patchUpdatedUserInfo()
//   .then(res =>{
//     console.log(res)
//   })
//   .catch((err) => {console.log(err)});



// Set new profile values by submitting form


// Add new Card to cardList by submitting form
// const submitNewCard = (cardProperties) => {
//   cardList.addItem(createCard(cardProperties, imagePopup), prependMethod);
//   newCardPopup.close();
// }


