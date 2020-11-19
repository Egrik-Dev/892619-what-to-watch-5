import React from 'react';
import {filmsProps} from '../../props/props';
import {Link} from 'react-router-dom';
import MoviesList from '../movies-list/movies-list';
import Tabs from '../tabs/tabs';
import {filterFilms} from '../../utils';
import {MAX_RELATED_FILMS} from '../../const';
import PropTypes from 'prop-types';
import HeaderUserBlock from '../header-user-block/header-user-block';

const MovieScreen = (props) => {
  const {films, id} = props;

  const [activeTab, setActiveTab] = React.useState(`Overview`);
  const [activeFilmId, setActiveFilmId] = React.useState(Number(id));

  const clickFilmHandler = React.useCallback((filmId) => {
    setActiveFilmId(filmId);
  });

  const clickTabHandler = React.useCallback((evt) => {
    evt.preventDefault();

    const target = evt.target.text;
    if (target) {
      setActiveTab(target);
    }
  });

  const fullCardFilm = films.find((film) => film.id === activeFilmId);

  const filteredFilms = filterFilms(films, fullCardFilm.genre);
  const relatedFilms = filteredFilms.filter((film) => film !== fullCardFilm);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={fullCardFilm.backgroundImage} alt={fullCardFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={`/`} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <HeaderUserBlock />
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{fullCardFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{fullCardFilm.genre}</span>
                <span className="movie-card__year">{fullCardFilm.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={`/player/${fullCardFilm.id}`} style={{marginRight: `14px`}}>
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                <Link to="/mylist" style={{marginRight: `14px`}}>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </Link>
                <Link to={`/movies/${fullCardFilm.id}/review`} className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={fullCardFilm.posterImage} alt={`${fullCardFilm.name} poster`} width="218" height="327" />
            </div>
            <Tabs
              activeTab={activeTab}
              film={fullCardFilm}
              clickTabHandler={clickTabHandler}
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesList
            films={relatedFilms.slice(0, MAX_RELATED_FILMS)}
            clickFilmHandler={clickFilmHandler}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={`/`} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

MovieScreen.propTypes = {
  films: filmsProps.films,
  id: PropTypes.string.isRequired
};

export default MovieScreen;
