import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
  constructor(selector, { formSubmitCallback }) {
    super(selector);
    this.formSubmitCallback = formSubmitCallback;
    this.form = this._selector.querySelector('.form');
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this.button = this.form.querySelector('.popup__btn');
    // this.inputs = Array.from(this.form.querySelectorAll('.popup__element'));
    this.inputs = this.form.querySelectorAll('.popup__element');
    // this.data = data;
  }

  // _getInputValues() {
  //   const newInputs = this.inputs.map((input) => input.value);
  //   return newInputs;
  // }

  _getInputValues() {
    this._formValues = {};
    this.inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  // _handleFormSubmit(evt) {
  //   evt.preventDefault();
  //   this.formSubmitCallback();
  //   if (this.form.id === "profileInfo") {
  //     this.data[0].textContent = this._getInputValues()[0];
  //     this.data[1].textContent = this._getInputValues()[1];
  //   } else if (this.form.id === "profileAvatar") {
  //     this.data[0].style.backgroundImage = `url(${this._getInputValues()[0]}`;
  //   }
  //   this.form.reset();
  //   this.button.classList.add('popup__btn_inactive');
  //   this.button.disabled = true;

  // }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.formSubmitCallback(this._getInputValues());
    console.log(this._getInputValues());
    this.form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._handleFormSubmit);
  }
}
