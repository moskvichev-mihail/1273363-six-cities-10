import {useParams} from 'react-router-dom';
import React, {MouseEvent, useEffect, useState} from 'react';
import {AppRoute, MAX_GALLERY, MAX_RATING, OfferCardType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {redirectToRoute} from '../../store/action';
import {
  fetchFavoriteOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  setIsFavoriteAction
} from '../../store/api-actions';
import {getFavoriteOffers, getLoadedDataStatus, getNearbyOffers} from '../../store/app-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getOffer} from '../../store/app-data/selectors';
import {getOfferType, getPercent, isAuth} from '../../utils';
import Header from '../../components/header/header';
import Preloader from '../../components/preloader/preloader';
import NotFound from '../../pages/not-found/not-found';
import OfferCardList from '../../components/offer-card-list/offer-card-list';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';

function Room(): JSX.Element {
  const {id} = useParams<{ id: string; }>();
  const propertyId = Number(id);

  const dispatch = useAppDispatch();
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const property = useAppSelector(getOffer);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  const [isFavorite, setIsFavorite] = useState(property !== null ? property.isFavorite : false);

  useEffect(() => {
    setIsFavorite(property !== null ? property.isFavorite : false);
  }, [dispatch, property]);

  useEffect(() => {
    dispatch(fetchOfferAction(propertyId));
  }, [dispatch, favoriteOffers, isFavorite, propertyId]);

  if (!isDataLoaded) {
    return <Preloader/>;
  }

  if (!property) {
    return <NotFound/>;
  }

  const {bedrooms, isPremium, title, rating, maxAdults, price, host, description} = property;
  const type = getOfferType(property.type);
  const images = property.images.slice(0, MAX_GALLERY);

  const handleAddToFavorites = async (evt: MouseEvent) => {
    evt.preventDefault();

    if (isAuth(authorizationStatus)) {
      await dispatch(setIsFavoriteAction({
        offerId: property.id,
        isFavorite: !isFavorite,
        onSuccess: setIsFavorite,
      }));

      await dispatch(fetchOffersAction());
      await dispatch(fetchFavoriteOffersAction());
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image: string) => (
                <div className="property__image-wrapper" key={`${id}-${image}`}>
                  <img className="property__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className={`property__bookmark-button${isFavorite ? ' property__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={handleAddToFavorites}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getPercent(rating, MAX_RATING)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                {
                  type !== null &&
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                }
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  <li className="property__inside-item">
                    Wi-Fi
                  </li>
                  <li className="property__inside-item">
                    Washing machine
                  </li>
                  <li className="property__inside-item">
                    Towels
                  </li>
                  <li className="property__inside-item">
                    Heating
                  </li>
                  <li className="property__inside-item">
                    Coffee machine
                  </li>
                  <li className="property__inside-item">
                    Baby seat
                  </li>
                  <li className="property__inside-item">
                    Kitchen
                  </li>
                  <li className="property__inside-item">
                    Dishwasher
                  </li>
                  <li className="property__inside-item">
                    Cabel TV
                  </li>
                  <li className="property__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  {host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <Reviews offerId={propertyId}/>
            </div>
          </div>
          <section className="property__map map">
            <Map activeOffer={propertyId} className="property__map" offers={[property, ...nearbyOffers]}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OfferCardList offers={nearbyOffers} offerCardType={OfferCardType.NearPlace} onActiveOfferChange={() => false}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
