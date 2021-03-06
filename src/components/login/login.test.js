import React from 'react';
import renderer from 'react-test-renderer';
import {LoginScreen} from './login';
import {Route, Router} from 'react-router-dom';
import browserHistory from '../../browser-history';

const noop = () => {};

it(`Should LoginScreen render correctly without authorization`, () => {
  const tree = renderer
    .create(
        <Router history={browserHistory}>
          <Route>
            <LoginScreen
              loginAction={noop}
              fetchFilmsAction={noop}
              fetchPromoFilmAction={noop}
              authorizationStatus={`NO_AUTH`}
              redirectToRouteAction={noop}
            />
          </Route>
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
