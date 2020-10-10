class Card {

  constructor(data, {handleCardClick, handleLikeClick, handleDeleteClick }, cardSelector){
    this._title = data.name;
    this._image = data.link;
    this._likeNumber = data.likes;
    this._id = data.id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
  // _handleLikeClick(likeButton) {
  //   console.log(likeButton)
  //   //return this._handleLikeClick()
  //   likeButton.classList.toggle('mesto-card__like-icon_active');
  // }

  // Method for removing card
  // _handleDeleteClick(deleteButton) {
  //   deleteButton.parentElement.remove()
  // }

  _setEventListeners() {
    this._element.querySelector('.mesto-card__like-icon').addEventListener('click', (evt) => {
      this._handleLikeClick(evt.target);
      this._likeCounter.textContent = this._likeNumber.length + 1;
    });
    if(this._element.querySelector('.mesto-card__trash')){
      this._element.querySelector('.mesto-card__trash').addEventListener('click', (evt) => {
        this._handleDeleteClick(this._trash);
      });
    }
    this._element.querySelector('.mesto-card__image').addEventListener('click', ()=>{
      this._handleCardClick();
    })
  }

  createCard() {
    this._element = this._getTemplate();

    const elementImage = this._element.querySelector('.mesto-card__image');
    const elementTitle = this._element.querySelector('.mesto-card__title');
    this._likeCounter = this._element.querySelector('.mesto-card__like-number');
    this._trash = this._element.querySelector('.mesto-card__trash');
    elementImage.src = this._image;
    elementImage.alt = this._title;
    elementTitle.textContent = this._title;

    if(this._likeNumber){
      this._likeCounter.textContent = this._likeNumber.length;
    }

    this._setEventListeners();

    return this._element;
  }
}

export {Card};
