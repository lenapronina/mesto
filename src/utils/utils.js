import { Card } from '../components/Card.js';


export const createCard = (cardParams, popupWithImage) => {
  const card = new Card({
    name: cardParams.name,
    link: cardParams.link,
    handleCardClick: () =>{
      popupWithImage.open( cardParams.name, cardParams.link);
    }
  }, '.mesto-template');
  return card.createCard();;
}
