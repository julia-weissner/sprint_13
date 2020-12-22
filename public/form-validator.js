class FormValidator {
	constructor(validForm) {
		this.validForm = validForm;
		this.setEventListeners = this.setEventListeners.bind(this);
		this.errorMessagesSpan = this.validForm.querySelectorAll("span");
	}

	checkInputValidity(input) {
		
		const errorMessages = {
			empty: 'Это обязательное поле',
			wrongLength: 'Должно быть от 2 до 30 символов',
			wrongUrl: 'Здесь должна быть ссылка'
		  }

		input.setCustomValidity('');

		if (input.validity.valueMissing) {
			input.setCustomValidity(errorMessages.empty);
			return false
		}
		if (input.validity.tooShort || input.validity.tooLong) {
			input.setCustomValidity(errorMessages.wrongLength);
			return false
		}
		if (input.validity.typeMismatch && input.type === 'url') {
			input.setCustomValidity(errorMessages.wrongUrl);
			return false
		}
		return input.checkValidity();
	}


	setSubmitButtonState(button, state) {

		if (state) {
			button.removeAttribute('disabled');
			button.classList.add(`popup__button_is-valid`);
		} else {
			button.setAttribute('disabled', true);
			button.classList.remove(`popup__button_is-valid`);
		}
	}


	isFieldValid(input) {

		const errorElem = input.parentNode.querySelector(`#error-${input.id}`);
		const valid = this.checkInputValidity(input);
		errorElem.textContent = input.validationMessage;
		return valid;
	}


	isFormValid(event) {
		event.preventDefault();

		const inputs = [...this.validForm.querySelectorAll('input')];
		let valid = true;

		inputs.forEach((input) => {
			if (input.type !== 'submit' && input.type !== 'button') {
				if (!this.isFieldValid(input)) valid = false;
			}
		});
		return valid;
	}


	setEventListeners() {

		const submit = this.validForm.querySelector('.button');
		const inputs = [...this.validForm.querySelectorAll('input')];

		this.validForm.addEventListener('input', (event) => {
			const inputForValidation = event.target;

			this.isFieldValid(inputForValidation);

			if (inputs.every(this.checkInputValidity)) {
				this.setSubmitButtonState(submit, true);
			} else {
				this.setSubmitButtonState(submit, false);
			}
		});
	}


	errorReset() {
		this.errorMessagesSpan.forEach((elem) => {
			elem.textContent = "";
		});
	}
}

