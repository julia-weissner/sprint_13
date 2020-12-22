class PopupContent extends Popup {
    constructor(element, closeElement, form) {
        super(element, closeElement);
        this.form = form;
    }

    close() {
        super.close();
        this.form.reset();
    }
}