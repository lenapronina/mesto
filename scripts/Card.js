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
  }

  createCard() {
    this._element = this._getTemplate();

    const elementImage = this._element.querySelector('.mesto-card__image');
    const elementTitle = this._element.querySelector('.mesto-card__title');

    elementImage.src = this._image;
    elementImage.alt = this._title;
    elementTitle.textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}

export {Card};
