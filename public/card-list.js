class Cardlist {

  constructor(container, createCard) {
    this.container = container;
    this.createCard = createCard;
  }

  addCard(name, link) {
    const cardElement = this.createCard(name, link);
    this.container.appendChild(cardElement);
  }

  render(array) {
    array.forEach((item) => {
      const card = this.createCard(item.name, item.link);
      this.container.appendChild(card.create());
      card.setEventListeners();
    })
  }
}








