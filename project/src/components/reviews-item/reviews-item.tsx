import {Review} from '../../types/review';
import {MAX_RATING} from '../../const';
import {getDate, getPercent} from '../../utils';

type ReviewsItemProps = {
  review: Review;
}

function ReviewsItem({review}: ReviewsItemProps): JSX.Element {
  const {comment, date, rating, user} = review;
  const {dateTime, dateText} = getDate(date);
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getPercent(rating, MAX_RATING)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>{dateText}</time>
      </div>
    </li>
  );
}

export default ReviewsItem;
