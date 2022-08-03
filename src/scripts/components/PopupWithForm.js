import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
  constructor(selector, { formSubmitCallback }) {
    super(selector);
    this.formSubmitCallback = formSubmitCallback;
    this.form = this._selector.querySelector('.form');
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.button = this.form.querySelector('.popup__btn');
  }

  _getInputValues() {
    const inputs = Array.from(this.form.querySelectorAll('.popup__element'));
    const newInputs = inputs.map((input) => input.value);
    return newInputs;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.formSubmitCallback();
    this.form.reset();
    this.button.classList.add('popup__btn_inactive');
    this.button.disabled = true;

  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._handleFormSubmit)
  }
}
