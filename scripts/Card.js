class Card {

  constructor( {name, link, handleCardClick }, cardSelector,){
    this._title = name;
    this._image = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.mesto-card__image').addEventListener('click', ()=>{
      this._handleCardClick();
    })
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
