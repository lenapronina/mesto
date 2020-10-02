import { appendMethod } from '../utils/constants.js';

export class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element, method) {
    if(method == appendMethod){
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
