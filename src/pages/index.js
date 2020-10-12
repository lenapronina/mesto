import './index.css';

import {
  formSelectors,
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
  avatarForm,
  profileSubmitButton,
  cardSubmitButton,
  avatarSubmitButton,
  popupLoadingFailure
} from '../utils/constants.js';

import { renderLoading } from '../utils/utils.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

// FormValidator instances
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

const createCard = (cardParams, popupWithImage, popupWithSubmit) => {
  const card = new Card( cardParams, '.mesto-template', {
    handleLikeClick:(likes) => {
      if(card.isLiked(likes)){
        api.deleteLike(cardParams._id)
          .then(data => {
            card.updatedLikesState(data.likes)
          })
          .catch(err => console.log(err));
      } else {
        api.addLike(cardParams._id)
          .then(data => {
            card.updatedLikesState(data.likes)
          })
          .catch(err => console.log(err));
      }
    },
    handleCardClick: () => {
      popupWithImage.open(cardParams.name, cardParams.link);
    },
    handleDeleteClick: (deleteButton) => {
      popupWithSubmit.open(cardParams._id, deleteButton);
    }
  });
  return card.createCard();
}


api.getAllInitialData()
  .then((data) => {
    const [ initialCardsList, userProfileData] = data;

    const submitAction = (id, childElement)=>{
      api.deleteCard(id)
        .then(() => {
          childElement.parentElement.remove();
        })
        .catch(err => console.log(err))
        .finally(()=>{
          popupDeleteConfirm.close()
        })
    }
    const popupDeleteConfirm = new PopupWithSubmit('.popup_submit-action', submitAction);
    const imagePopup = new PopupWithImage('.popup_image-viewer');

    imagePopup.setEventListeners();
    popupDeleteConfirm.setEventListeners();

    const cardList = new Section({
      items: initialCardsList,
      renderer:(cardItem) => {
        cardList.addItem(createCard(cardItem, imagePopup, popupDeleteConfirm), appendMethod);
      }
    }, cardsContainer);
    cardList.renderItems();

    const userProfile = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

    userProfile.setUserInfo(userProfileData);
    return [cardList, userProfile, imagePopup, popupDeleteConfirm];
  })
  .then(([cardList, userProfile, imagePopup, popupDeleteConfirm]) => {

    const sumbitAvatarForm = (avatarValue) => {
      renderLoading(true, avatarSubmitButton);
      api.patchUserAvatar(avatarValue)
        .then((json) => {
          userProfile.updateAvatar(json);
          avatarPopup.close();
        })
        .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, avatarSubmitButton, 'Сохранить');
      });
    }

    const avatarPopup = new PopupWithForm('.popup_avatar-update', sumbitAvatarForm);

    const submitNewCard = (cardProperties) => {
      renderLoading(true, cardSubmitButton);
      api.postNewCard(cardProperties)
        .then((cardProperties) => {
          cardList.addItem(createCard(cardProperties, imagePopup, popupDeleteConfirm), prependMethod);
          newCardPopup.close();
        })
        .catch(err => console.log(err))
      .finally(()=> {
        renderLoading(false, cardSubmitButton, 'Создать');
      })
    }

    const newCardPopup = new PopupWithForm ('.popup_add-card', submitNewCard);

    const sumbitProfileForm = (profileValues) => {
      renderLoading(true, profileSubmitButton);
      api.patchUpdatedUserInfo(profileValues)
        .then((json)=> {
          userProfile.updateUserInfo(json);
          profilePopup.close();
        })
        .catch(err => console.log(err))
      .finally(()=> {
        renderLoading(false, profileSubmitButton, 'Сохранить');
      })
    }

    const profilePopup = new PopupWithForm('.popup_profile-edit', sumbitProfileForm);

    // Rewriting input fields with values from userProfile
    const fillProfilePopupInputs = () => {
      const valuesFromProfile = userProfile.getUserInfo();
      nameInput.value = valuesFromProfile.name;
      jobInput.value = valuesFromProfile.job;
    }

    // Fill inputs before first userProfile validation
    fillProfilePopupInputs();

    // Enable validation
    profileFormValidator.enableValidation();
    cardFormValidator.enableValidation();
    avatarFormValidator.enableValidation();

    // Add listeners to popups
    profilePopup.setEventListeners();
    newCardPopup.setEventListeners();
    avatarPopup.setEventListeners();

    // Add listeners to buttons
    profileEditButton.addEventListener('click', () => {
      fillProfilePopupInputs();
      profilePopup.open();
    });

    newCardButton.addEventListener('click',() => {
      newCardPopup.open();
    });

    profileAvatarButton.addEventListener('click', ()=>{
      avatarPopup.open();
    });
  })
  .catch((err) => {
    console.log(err);
    popupLoadingFailure.classList.add('popup_opened');
  }
);
