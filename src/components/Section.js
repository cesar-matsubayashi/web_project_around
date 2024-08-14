export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  removeItem(elementId) {
    const index = this._renderedItems
      .reverse()
      .findIndex((element) => element._id === elementId);
    this._container.removeChild(this._container.children[index]);
  }

  renderItems() {
    this._renderedItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
