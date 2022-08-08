import { Card } from "../components/Card.js";
import { api } from "../components/Api.js";

export function renderLoading(formButton, textButton) {
  formButton.textContent = textButton;
}

export function createCard(cardItem, cardSelector, userId) {
  let cardTemplate = "";
  cardTemplate = new Card(cardItem, cardSelector, userId);
  const cardElement = cardTemplate.generate();

  cardElement
    .querySelector(".card__like")
    .addEventListener("click", function () {
      if (
        cardElement
          .querySelector(".card__like")
          .classList.contains("card__like_liked")
      ) {
        api.removeLikefromCard(cardItem._id).then((data) => {
          cardTemplate.handleDislike(data);
        });
      } else {
        api.addLikeToCard(cardItem._id).then((data) => {
          cardTemplate.handleLike(data);
        });
      }
    });
  cardElement
    .querySelector(".card__remove-icon")
    .addEventListener("click", function () {
      api.deleteCard(cardItem._id).then(() => {
        cardTemplate.deleteCard();
      });
    });

    return cardElement;
}
