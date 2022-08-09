import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Error(): JSX.Element {
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--error">
        <section className="container">
          <h1>
            Server Unavailable.
            <br/>
            <small>Please try again later.</small>
          </h1>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default Error;
