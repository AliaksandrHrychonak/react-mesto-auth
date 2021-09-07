import React from 'react';
import { Link } from "react-router-dom";
export const SignIn = () => {

  return (
    <section className="access">
      <form className="access__form">
        <h1 className="access__title">
          Вход
        </h1>
        <input type="email" className="access__form-input"/>
        <input type="email" className="access__form-input"/>
        <button className="access__button-submit" type="submit"></button>
      </form>
      <p className="access__option">Уже зарегистрированы?
      <Link to="sign-in" className="access__login-link">Войти</Link>
      </p>
    </section>
  );
}

