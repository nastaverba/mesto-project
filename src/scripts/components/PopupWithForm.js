import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, { formSubmitCallBack }) {
    super(popupElement);
    this._formSubmitCallBack = formSubmitCallBack;
    this._formSubmit = this._formSubmit.bind(this);
    this._form = this._popupElement.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__element"));
    this._submitButton = this._form.querySelector(".popup__btn");
  }

  _getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }
}

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
