import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute, OfferCardType} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getServerAvailabilityStatus} from '../../store/app-data/selectors';
import {isCheckedAuth} from '../../utils';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Error from '../../pages/error/error';
import Preloader from '../preloader/preloader';
import NotFound from '../../pages/not-found/not-found';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isServerAvailable = useAppSelector(getServerAvailabilityStatus);

  if (!isServerAvailable) {
    return <Error/>;
  }

  if (isCheckedAuth(authorizationStatus)) {
    return <Preloader/>;
  }

  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout/>}>
        <Route index element={<Main offerCardType={OfferCardType.City}/>}/>
        <Route path={AppRoute.Login} element={<Login/>}/>
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room} element={<Room/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;
