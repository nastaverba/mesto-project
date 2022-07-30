export class FormValidator {
  constructor(popupElements, popupForm) {
    this._form = popupForm;
    this._formSelector = popupElements.formSelector;
    this._inputSelector = popupElements.inputSelector;
    this._submitButtonSelector = popupElements.submitButtonSelector;
    this._inactiveButtonClass = popupElements.inactiveButtonClass;
    this._inputErrorClass = popupElements.inputErrorClass;
    this._errorClass = popupElements.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._errors = Array.from(this._form.querySelectorAll(this._errorClass));
  }

  _setEventListeners() {
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(inputElement) {
    this._inputElement = inputElement;

    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }
  _showInputError() {
     this._errorElement = this._form.querySelector(`.${this._inputElement.id}-error`);
     this._inputElement.classList.add(this._inputErrorClass);
     this._errorElement.classList.add(this._errorClass);
     this._errorElement.textContent = this._inputElement.validationMessage;
  }

  _hideInputError() {
    this._errorElement = this._form.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => evt.preventDefault()),
      this._setEventListeners();
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

}




