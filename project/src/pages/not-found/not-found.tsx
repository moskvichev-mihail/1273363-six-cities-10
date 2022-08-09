import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFound(): JSX.Element {
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--404">
        <section className="404 container">
          <h1>
            404.
            <br/>
            <small>Page not found</small>
          </h1>
          <Link to={AppRoute.Root}>Go to main page</Link>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default NotFound;
