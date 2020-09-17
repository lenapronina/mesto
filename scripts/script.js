const formElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  formEditClass: 'form-edit',
  formAddCardClass: 'form-addcard'
};

// Container for cards
const cardsContainer = document.querySelector('.mesto-cards');


const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const profilePopup = document.querySelector('.popup_profile-edit');
const newCardPopup = document.querySelector('.popup_add-card');

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
function openPopup(param) {
  param.classList.add('popup_opened');
}

//Hide popup by removing class
function closePopup(param) {
  param.classList.remove('popup_opened');
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
  const cardProperties = {
    name: placeValue.value,
    link: linkValue.value
  }
  // Сreate new card instance
  const card = new Card(cardProperties, '.mesto-template');
  const cardElement = card.render();
  // Add card to container
  cardsContainer.prepend(cardElement);
}

// Render cards from an array
initialCards.forEach((item) => {
  // Сreate new card instance
  const card = new Card(item, '.mesto-template');
  // Render card
  const cardElement = card.render();
   // Add card to container
  cardsContainer.append(cardElement);
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

profileEditButton.addEventListener('click', () => {

  fillFields();
  // Сreate new formvalidator instance
  const profileFormValidator = new FormValidator(formElements, profileForm);
  // Use public method of formvalidator
  profileFormValidator.enableValidation();

  openPopup(profilePopup);
  // Add hiding function to opened popup
  closePopupByKeyboard(profilePopup);
});


newCardButton.addEventListener('click',() => {
  // Reset form inputs
  cardForm.reset();
  // Сreate new formvalidator instance
  const cardFormValidator = new FormValidator(formElements, cardForm);
  // Use public method of formvalidator
  cardFormValidator.enableValidation();

  openPopup(newCardPopup);
  closePopupByKeyboard(newCardPopup);
});
