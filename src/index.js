import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/root-reducer';
import thunk from 'redux-thunk';
import {createApi} from './services/api';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ActionCreator} from './store/action';
import {redirect} from './midllewares/redirect';
import {AuthStatus} from './const';

const api = createApi(() => store.dispatch(ActionCreator.changeAuthorizationStatus(AuthStatus.NO_AUTH)));

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
