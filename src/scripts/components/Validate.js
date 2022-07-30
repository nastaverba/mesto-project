<<<<<<< HEAD
export default class FormValidator {
  constructor(data, selector) {
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.selector = selector;
  }

  //Обработчики форм
  enableValidation() {
    document.querySelector(this.selector).addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(123);
    });
    this._setEventListeners();
  };

  //Обработчики полей формы
  _setEventListeners() {
    this.inputList = Array.from(document.querySelector(this.selector).querySelectorAll(this.inputSelector));
    this.buttonElement = document.querySelector(this.selector).querySelector(this.submitButtonSelector);
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //Изменение активности кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.disabled = false;
    };
  };

  //Проверка валидности полей
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //Показать ошибку
  _showInputError(inputElement) {
    // убрала циклы, в методы добавила inputElement как аргумент
    this.errorElement = document.querySelector(this.selector).querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    this.errorElement.textContent = inputElement.validationMessage;
    this.errorElement.classList.add(this.errorClass);
  };

  //Скрыть ошибку
  _hideInputError(inputElement) {
    // убрала циклы, в методы добавила inputElement как аргумент
    this.errorElement = document.querySelector(this.selector).querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    this.errorElement.textContent = '';
    this.errorElement.classList.remove(this.errorClass);
  };

  //Валидация поля
  _isValid(inputElement) {
    // убрала циклы, в методы добавила inputElement как аргумент
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

}
// const enableValidationConfig = {
//   inputSelector: '.popup__element',
//   submitButtonSelector: '.popup__btn',
//   inactiveButtonClass: 'popup__btn_inactive',
//   inputErrorClass: 'popup__element_type_error',
//   errorClass: 'popup__element-error_active'
// }


// const avatarValidation = new FormValidator(enableValidationConfig,"#profileAvatar");
// avatarValidation.enableValidation();



// //Показать ошибку
// const showInputError = (formElement, inputElement, errorMessage, obj) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(obj.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(obj.errorClass);
// };

// //Скрыть ошибку
// const hideInputError = (formElement, inputElement, obj) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(obj.inputErrorClass);
//   errorElement.textContent = '';
//   errorElement.classList.remove(obj.errorClass);
// };

// //Валидация поля
// const isValid = (formElement, inputElement, obj) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, obj);
//   } else {
//     hideInputError(formElement, inputElement, obj);
//   }
// };

// //Активность кнопки при валидации
// //Проверка валидности полей
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// //Изменение активности кнопки
// const toggleButtonState = (inputList, buttonElement, obj) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(obj.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(obj.inactiveButtonClass);
//     buttonElement.disabled = false;
//   };
// };

// //Обработчики полей формы
// const setEventListeners = (formElement, obj) => {
//   const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
//   const buttonElement = formElement.querySelector(obj.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, obj);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement, obj);
//       toggleButtonState(inputList, buttonElement, obj);
//     });
//   });
// };

// //Обработчики форм
// const enableValidation = (obj) => {
//   const formList = Array.from(document.querySelectorAll(obj.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, obj);
//   });
// };

// //Экспорт
// export {showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation};
=======
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




>>>>>>> ca7611b58b91437e626f2b4e79c5227ac54ff43e
