import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoriteOffersAction} from '../../store/api-actions';
import {setLoadedDataStatus} from '../../store/app-data/app-data';
import {getFavoriteOffers, getLoadedDataStatus} from '../../store/app-data/selectors';
import {setActiveCity} from '../../store/app-process/app-process';
import {AppRoute, cities, OfferCardType} from '../../const';
import {filterOffers} from '../../utils';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Preloader from '../../components/preloader/preloader';
import OfferCardList from '../../components/offer-card-list/offer-card-list';

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isExistFavoriteOffers = favoriteOffers !== null && (favoriteOffers.length > 0);

  useEffect(() => {
    dispatch(setLoadedDataStatus(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch, isExistFavoriteOffers]);

  if (!isDataLoaded) {
    return <Preloader/>;
  }

  return (
    <div className={`page${!isExistFavoriteOffers ? ' page--favorites-empty' : ''}`}>
      <Header/>
      <main className={`page__main page__main--favorites${!isExistFavoriteOffers ? ' page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`favorites${!isExistFavoriteOffers ? ' favorites--empty' : ''}`}>
            {isExistFavoriteOffers ? (
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {
                    cities.map((city) => {
                      const offers = filterOffers(city, favoriteOffers);
                      if (offers.length > 0) {
                        return (
                          <li className="favorites__locations-items" key={city}>
                            <div className="favorites__locations locations locations--current">
                              <div className="locations__item">
                                <Link
                                  className="locations__item-link"
                                  to={AppRoute.Root}
                                  onClick={() => dispatch(setActiveCity(city))}
                                >
                                  <span>{city}</span>
                                </Link>
                              </div>
                            </div>
                            <div className="favorites__places">
                              <OfferCardList offers={offers} offerCardType={OfferCardType.Favorite} onActiveOfferChange={() => false}/>
                            </div>
                          </li>
                        );
                      }
                    })
                  }
                </ul>
              </>
            ) : (
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Favorites;
