class Popup {
    constructor(element, closeElement) {
        this.element = element;
        this.closeElement = closeElement;
    }

    open() {
        this.element.classList.add("popup_is-opened");
        this.popupEventHandlers()
    }

    close() {
        this.element.classList.remove("popup_is-opened");
    }

    popupEventHandlers() {
        this.closeElement.addEventListener("click", () => this.close());
    }

}