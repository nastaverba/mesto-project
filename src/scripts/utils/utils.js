import { Card } from "../components/Card.js";
import { api } from "../components/Api.js";
import { PopupWithImage } from "../components/PopupWithImage";
export function renderLoading(formButton, textButton) {
  formButton.textContent = textButton;
}
import { photoPopup } from "../pages/index.js";



export function createCard(cardItem, cardSelector, userId) {
  let cardTemplate = "";
  cardTemplate = new Card(cardItem, cardSelector, userId, {
    handleCardClick: (name, link) => {
      photoPopup.open(name, link);
    },
  }, {
    deleteFunction: () => {
      api.deleteCard(cardItem._id)
        .then(() => {
          cardTemplate.deleteCard();
        },
        );
    }
  },
    {
      likeFunction: () => {
        api.addLikeToCard(cardItem._id).then((data) => {
          cardTemplate.handleLike(data);
        });;
      }
    },
    {
      dislikeFunction: () => {
        api.removeLikefromCard(cardItem._id).then((data) => {
          cardTemplate.handleDislike(data);
        });
      }
    }

  );
  const cardElement = cardTemplate.generate();
  return cardElement;
}
