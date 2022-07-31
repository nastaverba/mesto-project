import { Popup } from "./Popup.js";

// export default class PopupWithForm extends Popup {
//   constructor(popupElement, { formSubmitCallBack }) {
//     super(popupElement);
//     this._formSubmitCallBack = formSubmitCallBack;
//     this._formSubmit = this._formSubmit.bind(this);
//     this._form = this._popupElement.querySelector(".form");
//     this._inputs = Array.from(this._form.querySelectorAll(".popup__element"));
//     this._submitButton = this._form.querySelector(".popup__btn");
//   }

//   _getInputValues() {
//     const data = {};
//     this._inputs.forEach((input) => {
//       data[input.name] = input.value;
//     });
//     return data;
//   }
// }

// const testPopup = new PopupWithForm("#edit", {
//   formSubmitCallBack: (data) => {
//     api
//       .editProfile(data)
//       .then((res) => {
//         userInfo.setUserInfo(res);
//         editPopup.close();
//       })
//       .catch((err) => console.log(err))
//   },
// })

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
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._handleFormSubmit)
  }
}
