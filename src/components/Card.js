import { myId } from '../utils/constants.js'

class Card {

  constructor( data, cardSelector, { handleCardClick, handleLikeClick, handleDeleteClick }){
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._owner = data.owner._id;
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

  // check card owner to show or hide deleteButton element
  _checkCardOwner(){
    if(!(this._owner === myId)){
      this._deleteButton.style.display = 'none';
    }
  }

  // add or remove active class from button
  _addLikeActiveClass(){
    this._likeButton.classList.add('mesto-card__like-icon_active');
  }
  _removeLikeActiveClass(){
    this._likeButton.classList.remove('mesto-card__like-icon_active');
  }

  // check likes from my id
  isLiked(likes){
    if(likes.find(item => item._id === myId)){
      return true;
    } else {
      return false;
    }
  }

  // updated likes data after server response
  updatedLikesState(data){
    this._likes = data;
    //change likes info
    this._likeCounter.textContent = this._likes.length;
    if( this._likeButton.classList.contains('mesto-card__like-icon_active')){
      this._removeLikeActiveClass();
    } else {
      this._addLikeActiveClass();
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(this._likes);
    });
    this._deleteButton.addEventListener('click', (evt) => {
      this._handleDeleteClick(this._deleteButton);
    });
    this._elementImage.addEventListener('click', ()=>{
      this._handleCardClick();
    })
  }

  createCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.mesto-card__image');
    this._elementTitle = this._element.querySelector('.mesto-card__title');
    this._likeButton = this._element.querySelector('.mesto-card__like-icon')
    this._likeCounter = this._element.querySelector('.mesto-card__like-number');
    this._deleteButton = this._element.querySelector('.mesto-card__trash');

    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;

    if(this.isLiked(this._likes)){
      this._addLikeActiveClass();
    }

    this._checkCardOwner();

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
