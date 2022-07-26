class FormValidator {
  constructor(data,selector) {
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
    this.inputList = Array.from(this.selector.querySelectorAll(this.inputSelector));
    this.buttonElement = this.selector.querySelector(this.submitButtonSelector);
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid();
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
_showInputError() {
  this.errorElement = this.selector.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this.inputErrorClass);
  this.errorElement.textContent = errorMessage;
  this.errorElement.classList.add(this.errorClass);
  console.log('hello');
};

//Скрыть ошибку
_hideInputError() {
  this.errorElement = document.querySelector(this.selector).querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  this.errorElement.textContent = '';
  this.errorElement.classList.remove(obj.errorClass);
};

//Валидация поля
_isValid () {
  if (!inputElement.validity.valid) {
    this._showInputError();
  } else {
    this._hideInputError();
  }
};

}
const enableValidationConfig = {
  inputSelector: '.popup__element',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__element_type_error',
  errorClass: 'popup__element-error_active'
}


const avatarValidation = new FormValidator(enableValidationConfig,"#profileAvatar");
avatarValidation.enableValidation();



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
