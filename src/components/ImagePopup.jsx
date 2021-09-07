import React from "react";
export function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${props.card ? "popup_opened" : " "}`}
    >
      <figure className="popup__container-image">
        <img
          src={props.card && props.card.link}
          alt={props.card && props.card.name}
          className="popup__image"
        />
        <button
          className="popup__button-close popup__button-close_image"
          type="button"
          name="Close"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <figcaption className="popup__description">
          {props.card && props.card.name}
        </figcaption>
      </figure>
    </div>
  );
}
