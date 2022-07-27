export class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
  }

  open() {
    this._selector.classList.add('popup_opened');
    console.log(this._selector);
    document.addEventListener('keydown', this._handleEscClose(evt));
  }

  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const addBtn = document.querySelector('.profile__add-btn');
    addBtn.addEventListener('click', () => {
      this.open();
    });
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

