import React from 'react';
import City from '../city/city';
import {cities} from '../../const';
import {useAppSelector} from '../../hooks';
import {getLoadedDataStatus} from '../../store/app-data/selectors';
import {getActiveCity, getActiveCityOffers} from '../../store/app-process/selectors';
import Preloader from '../../components/preloader/preloader';
import Places from '../places/places';
import NoPlaces from '../no-places/no-places';

type CityListProps = {
  offerCardType: string;
}

function CityList({offerCardType}: CityListProps) {
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const cityOffers = useAppSelector(getActiveCityOffers);
  const activeCity = useAppSelector(getActiveCity);

  const isExistOffers = cityOffers.length > 0;

  if (!isDataLoaded) {
    return <Preloader/>;
  }

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => <City city={city} key={city}/>)}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className={`cities__places-container${(isExistOffers) ? '' : ' cities__places-container--empty'} container`}>
          {isExistOffers ? (
            <Places cityName={activeCity} cityOffers={cityOffers} offerCardType={offerCardType}/>
          ) : (
            <NoPlaces cityName={activeCity}/>
          )}
        </div>
      </div>
    </>
  );
}

export default CityList;
