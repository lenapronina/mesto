import { Card } from '../components/Card.js';

export const renderLoading = (isLoading, button, initialText) => {
  if(isLoading){
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = initialText;
  }
}
