import { Card } from '../components/Card.js';

export const checkResStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

// export const createCard = (cardParams, popupWithImage) => {
//   const card = new Card(cardParams, {
//     handleLikeClick: ()=>{
//       fetch(`https://mesto.nomoreparties.co/v1/cohort-16/cards/likes/${cardParams._id}`, {
//         method: 'PUT',
//         headers: {
//           authorization: 'fba2c732-c582-4b59-a665-759f5dbd039a',
//           'Content-Type': 'application/json'
//         }
//       })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//     },
//     handleCardClick: () =>{
//       popupWithImage.open( cardParams.name, cardParams.link);
//     }
//   }, '.mesto-template');
//   return card.createCard();;
// }
