import React from 'react';
import Header from '../../components/header/header';
import CityList from '../../components/city-list/city-list';

type PageMainProps = {
  offerCardType: string;
}

function Main({offerCardType}: PageMainProps): JSX.Element {
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
