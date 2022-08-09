import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {allOffers} from './mocks/offers';
import {reviews} from './mocks/reviews';
import {store} from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        offers = {allOffers}
        reviews = {reviews}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
