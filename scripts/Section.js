export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  render() {
    // Método esponsable de crear y renderizar los datos en una página. Define el marcado de la página.
    this._renderer();
  }

  addItem() {}
}
