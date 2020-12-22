class Card {

    constructor(name, link, openImageCallback) {
        this.name = name;
        this.link = link;
        this.openImageCallback = openImageCallback;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.openImage = this.openImage.bind(this);
        
    }

    create() {
        const markup = `
        <div class="place-card">
            <div class="place-card__image">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <button class="place-card__like-icon"></button>
            </div>
        </div>
    `;
        const element = document.createElement('div');
        element.insertAdjacentHTML('afterbegin', markup);

        const newCard = element.firstElementChild;
        const newCardImage = newCard.querySelector('.place-card__image');
        const newCardName = newCard.querySelector('.place-card__name');
        newCardImage.setAttribute('style', `background-image:url(${this.link})`);
        newCardName.textContent = this.name;
        this.cardElement = newCard;
        this.setEventListeners();

        return newCard;
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this.removeEventListeners();
        this.cardElement.parentNode.removeChild(this.cardElement);
    }

    openImage(evt) { 
        this.openImageCallback(evt.target.style.backgroundImage.slice(5, -2))
    }

    removeEventListeners() {
       this.cardElement.querySelector('.place-card__image').removeEventListener('click', this.openImage)
    }

    setEventListeners() {
        this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove); 
        this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openImage);
    }


}