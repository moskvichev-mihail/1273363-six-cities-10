import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import {store} from './store';
import {checkAuthAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer/>
      <HistoryRouter history={browserHistory}>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
