class Card {

  constructor(data, cardSelector){
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // сlone element from template
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .cloneNode(true);

    // return DOM-element
    return cardElement;
  }

  // Method for showing imagePopup for each card
  _handlePopup(){
    const imagePopup = document.querySelector('.popup_image-viewer');

    imagePopup.querySelector('.popup__image').src = this._image;
    imagePopup.querySelector('.popup__caption').textContent = this._title;
    imagePopup.querySelector('.popup__image').alt = this._title;
    openPopup(imagePopup);
    closePopupByKeyboard(imagePopup);
  }

  // Method for making likeButton active
  _handleLikeClick(likeButton) {
    likeButton.classList.toggle('mesto-card__like_active');
  }

  // Method for removing card
  _handleDeleteClick(trashButton) {
    trashButton.parentElement.remove()
  }

  _setEventListeners() {
    this._element.querySelector('.mesto-card__like').addEventListener('click', (evt) => {
      this._handleLikeClick(evt.target);
    });
    this._element.querySelector('.mesto-card__trash').addEventListener('click', (evt) => {
      this._handleDeleteClick(evt.target);
    });
    this._element.querySelector('.mesto-card__image').addEventListener('click', (evt) => {
      this._handlePopup();
    });
  }

  render() {
    this._element = this._getTemplate();

    this._element.querySelector('.mesto-card__image').src = this._image;
    this._element.querySelector('.mesto-card__image').alt = this._title;
    this._element.querySelector('.mesto-card__title').textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}



