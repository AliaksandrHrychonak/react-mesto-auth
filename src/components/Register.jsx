import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

export const Register = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth.registration(email, password)
    .then((res) => {
      if (res) {
        history.push("/sign-in");
      }
    });
  };

  return (
    <section className="access" onSubmit={handleSubmit}>
      <form onSubmit={handleSubmit} className="access__form">
        <h1 className="access__title">Регистрация</h1>
        <div className="access__box-input">
          <input
            id="mal-reg"
            type="email"
            name="email"
            className="access__input"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            required
          />
          <span className="access__input-error"></span>
        </div>
        <div className="access__box-input access__box-input_type_margin">
          <input
            id="pas-reg"
            type="password"
            name="password"
            className="access__input"
            placeholder="Пароль"
            value={password}
            onChange={handlePassword}
            required
          />
          <span className="access__input-error"></span>
        </div>

        <button className="access__button-submit" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <Link to="sign-in" className="access__login-link">
        <p className="access__option">Уже зарегистрированы? Войти</p>
      </Link>
    </section>
  );
};
