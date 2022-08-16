import {memo, MouseEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {AppRoute, OfferCardType} from '../../const';
import {getOfferType, isAuth, getRating} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoriteOffersAction, fetchOffersAction, setIsFavoriteAction} from '../../store/api-actions';
import {setLoadedDataStatus} from '../../store/app-data/app-data';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {redirectToRoute} from '../../store/action';
import cn from 'classnames';

type OfferCardProps = {
  offer: Offer;
  offerCardType: string;
  onActiveOfferChange: (id: number) => void;
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const {offer, offerCardType, onActiveOfferChange} = props;
  const offerType = getOfferType(offer.type);
  const offerRating = getRating(offer.rating);

  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleMouseEnter = () => {
    onActiveOfferChange(offer.id);
  };

  const handleAddToFavorites = async (evt: MouseEvent) => {
    evt.preventDefault();

    if (isAuth(authorizationStatus)) {
      await dispatch(setIsFavoriteAction({
        offerId: offer.id,
        isFavorite: !isFavorite,
        onSuccess: setIsFavorite,
      }));

      await dispatch(fetchOffersAction());
      await dispatch(fetchFavoriteOffersAction());
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  const placeCardClassName = cn('place-card', {
    'cities__card': offerCardType === OfferCardType.City,
    'favorites__card': offerCardType === OfferCardType.Favorite,
    'near-places__card': offerCardType === OfferCardType.NearPlace,
  });
  const placeCardInfoClassName = cn('place-card__info', {
    'favorites__card-info': offerCardType === OfferCardType.Favorite,
  });
  const placeCardImageWrapperClassName = cn('place-card__image-wrapper', {
    'cities__image-wrapper': offerCardType === OfferCardType.City,
    'favorites__image-wrapper': offerCardType === OfferCardType.Favorite,
    'near-places__image-wrapper': offerCardType === OfferCardType.NearPlace,
  });
  const placeCardImageWidth = cn({
    '260': offerCardType === OfferCardType.City || offerCardType === OfferCardType.NearPlace,
    '150': offerCardType === OfferCardType.Favorite,
  });
  const placeCardImageHeight = cn({
    '200': offerCardType === OfferCardType.City || offerCardType === OfferCardType.NearPlace,
    '110': offerCardType === OfferCardType.Favorite,
  });
  return (
    <article className={`${placeCardClassName} place-card`} onMouseEnter={handleMouseEnter}>
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${placeCardImageWrapperClassName} place-card__image-wrapper`}>
        <Link
          to={`/offer/${offer.id}`}
          onClick={() => dispatch(setLoadedDataStatus(false))}
        >
          <img className="place-card__image" src={offer.previewImage} width={placeCardImageWidth} height={placeCardImageHeight} alt="Place image"/>
        </Link>
      </div>
      <div className={`${placeCardInfoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button${isFavorite ? ' place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleAddToFavorites}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: offerRating}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`/offer/${offer.id}`}
            onClick={() => dispatch(setLoadedDataStatus(false))}
          >
            {offer.title}
          </Link>
        </h2>
        {offerType !== null && <p className="place-card__type">{offerType}</p>}
      </div>
    </article>
  );
}

export default memo(OfferCard, (prevProps, nextProps) => prevProps.offer.id === nextProps.offer.id && prevProps.offer.isFavorite === nextProps.offer.isFavorite);
