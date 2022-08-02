import React from 'react';
import City from '../city/city';

type CityListProps = {
  cities: string[],
}

function CityList({cities}: CityListProps) {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => <City city={city} key={city}/>)}
      </ul>
    </section>
  );
}

export default CityList;
