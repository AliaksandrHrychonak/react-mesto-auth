import logo from "../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

export function Header(props) {
  
  const signOut = () => {
    localStorage.removeItem('jwt');
    props.handleLogOut();
  }

  return (
    <header className="header">
      <a href="/index.html" className="header__link" target="_blank">
        <img className="header__logo" src={logo} alt="Логотип" />
      </a>

      <Switch>
        <Route exact path="/">
          <div className="header__box-access">
            <p className="header__mail">{props.userData.email}</p>
            <Link
              to="/sign-in"
              onClick={signOut}
              className="header__link header__link_type_access"
            >
              Выйти
            </Link>
          </div>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
