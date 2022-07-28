export class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    console.log(this._selector);
  }

  open() {
    console.log(this._selector)
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {


    if (evt.key === "Escape") {
      console.log(evt.target);
      evt.target.classList.remove('popup_opened');
    }
  }







  setEventListeners() {
    // const addBtn = document.querySelector('.profile__add-btn');
    // addBtn.addEventListener('click', () => {
    //   this.open();
    // });
    const closeBtn = this._selector.querySelector('.popup__close-icon');
    closeBtn.addEventListener('click', () => {
      this.close();
    });
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}

