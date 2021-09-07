import React from "react";
export const DeleteCardPopup = (props) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onClick(props.card);
  };

  return (
    <div
      className={`popup popup_type_delete ${props.card ? "popup_opened" : " "}`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          name="Close"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title popup__title_theme_delete">
          {props.title}
        </h3>
        <button
          className="popup__button-save popup__button-save_type_delete"
          type="submit"
          name="delete"
          onClick={handleSubmit}
        >
          {props.isLoad ? "Удаление" : "Да"}
        </button>
      </div>
    </div>
  );
};
