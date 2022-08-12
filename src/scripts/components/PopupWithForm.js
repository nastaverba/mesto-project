import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
  constructor(popup, { formSubmitCallback }) {
    super(popup);
    this.formSubmitCallback = formSubmitCallback;
    this.form = this._popup.querySelector('.form');
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.button = this.form.querySelector('.popup__btn');
    this.inputs = this.form.querySelectorAll('.popup__element');
  }

  _getInputValues() {
    this._formValues = {};
    this.inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.formSubmitCallback(this._getInputValues());
  }

  close() {
    super.close();
    this.form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._handleFormSubmit);
  }
}
