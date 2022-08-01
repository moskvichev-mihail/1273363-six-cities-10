import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {MAX_RATING, OfferType} from '../../const';
import {getPercent} from '../../utils';
import cn from 'classnames';

type OfferCardProps = {
  offer: Offer;
  onMouseEnterHandle: () => void;
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const {offer, onMouseEnterHandle} = props;

  const placeCardClassName = cn('place-card', {
    'cities__card': OfferType.City,
    'favorites__card': OfferType.Favorite && !OfferType.City,
    'near-places__card': OfferType.NearPlace && !OfferType.Favorite && !OfferType.City,
  });
  const placeCardInfoClassName = cn('place-card__info', {
    'favorites__card-info': OfferType.Favorite,
  });
  const placeCardImageWrapperClassName = cn('place-card__image-wrapper', {
    'cities__image-wrapper': OfferType.City,
    'favorites__image-wrapper': OfferType.Favorite && !OfferType.City,
    'near-places__image-wrapper': OfferType.NearPlace && !OfferType.Favorite && !OfferType.City,
  });
  const placeCardImageWidth = cn({
    '260': OfferType.City || OfferType.NearPlace,
    '150': OfferType.Favorite && !OfferType.City && !OfferType.NearPlace,
  });
  const placeCardImageHeight = cn({
    '200': OfferType.City || OfferType.NearPlace,
    '110': OfferType.Favorite && !OfferType.City && !OfferType.NearPlace,
  });
  return (
    <article className={`${placeCardClassName}`} onMouseEnter={onMouseEnterHandle}>
      <div className="place-card__mark">
        {offer.isPremium && <span>Premium</span>}
      </div>
      <div className={`${placeCardImageWrapperClassName}`}>
        <Link className="header__logo-link" to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={placeCardImageWidth} height={placeCardImageHeight} alt="Place image" />
        </Link>
      </div>
      <div className={`${placeCardInfoClassName}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getPercent(offer.rating, MAX_RATING)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
