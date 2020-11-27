import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, fetchFilms, fetchPromoFilm} from '../../store/action-api';
import PropTypes from 'prop-types';

const LoginScreen = (props) => {
  const {loginAction, fetchFilmsAction, authorizationStatus, fetchPromoFilmAction} = props;

  const [loginInput, setLogin] = React.useState(``);
  const [passwordInput, setPassword] = React.useState(``);

  const handleLoginChange = React.useCallback((evt) => {
    setLogin(evt.currentTarget.value);
  });

  const handlePasswordChange = React.useCallback((evt) => {
    setPassword(evt.currentTarget.value);
  });

  const handleSubmitForm = React.useCallback((evt) => {
    evt.preventDefault();

    loginAction({loginInput, passwordInput})
      .then(() => fetchFilmsAction())
      .then(() => fetchPromoFilmAction());
  });

  if (authorizationStatus === `AUTH`) {
    return <Redirect to={`/`} />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={`/`} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmitForm}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                onChange={handleLoginChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                onChange={handlePasswordChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

LoginScreen.propTypes = {
  loginAction: PropTypes.func.isRequired,
  fetchFilmsAction: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  fetchPromoFilmAction: PropTypes.func.isRequired
};

const mapStateToProps = ({USER}) => ({
  authorizationStatus: USER.authorizationStatus
});

const mapDispatchToProps = (dispatch) => ({
  loginAction(authData) {
    return dispatch(login(authData));
  },
  fetchFilmsAction() {
    dispatch(fetchFilms());
  },
  fetchPromoFilmAction() {
    dispatch(fetchPromoFilm());
  }
});

export {LoginScreen};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
