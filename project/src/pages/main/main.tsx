import React, {useEffect} from 'react';
import Header from '../../components/header/header';
import CityList from '../../components/city-list/city-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOffersAction} from '../../store/api-actions';
import {setLoadedDataStatus} from '../../store/app-data/app-data';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type PageMainProps = {
  offerCardType: string;
}

function Main({offerCardType}: PageMainProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(setLoadedDataStatus(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch, authorizationStatus]);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <CityList offerCardType={offerCardType}/>
      </main>
    </div>
  );
}

export default Main;
