import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, OfferType} from '../../const';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
}

function App({offers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main offerType={OfferType.City}/>}/>
          <Route path={AppRoute.Login} element={<Login/>}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Room} element={<Room offers={offers} reviews={reviews}/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
