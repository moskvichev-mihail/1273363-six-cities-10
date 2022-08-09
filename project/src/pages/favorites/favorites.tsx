import OfferCardList from '../../components/offer-card-list/offer-card-list';
import {Offer} from '../../types/offer';

type FavoritesProps = {
  offers: Offer[];
}

function Favorites(props: FavoritesProps): JSX.Element {
  const {offers} = props;
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              <OfferCardList offers={offers} setActiveOffer={() => false}/>
            </div>
          </li>
          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Cologne</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              <OfferCardList offers={offers} setActiveOffer={() => false}/>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Favorites;
