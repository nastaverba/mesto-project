//Показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__element_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__element-error_active');
};

//Скрыть ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__element_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__element-error_active');
};

//Валидация поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Активность кнопки при валидации
//Проверка валидности полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Изменение активности кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__btn_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__btn_inactive');
    buttonElement.disabled = false;
  };
};

//Обработчики полей формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__element'));
  const buttonElement = formElement.querySelector('.popup__btn');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Обработчики форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

//Экспорт
export {showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation};
