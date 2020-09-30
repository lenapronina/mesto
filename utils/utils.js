import { Card } from '../components/Card.js';


export const createCard = (cardParams, popupName) => {
  const card = new Card({
    name: cardParams.name,
    link: cardParams.link,
    handleCardClick: () =>{
      popupName.open( cardParams.name, cardParams.link);
      popupName.setEventListeners();
    }
  }, '.mesto-template');
  const cardElement = card.createCard();

  return cardElement;
}
