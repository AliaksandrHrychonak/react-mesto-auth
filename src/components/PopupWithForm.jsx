import React from "react";
export function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : " "
      }`}
    >
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className="popup__button-save"
            type="submit"
            name="Save"
            aria-label="Сохранить"
          >
            {props.buttonText}
          </button>
        </form>
        <button
          className="popup__button-close"
          type="button"
          name="Close"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
