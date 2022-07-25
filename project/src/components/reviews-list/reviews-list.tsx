import {Review} from '../../types/review';
import {MAX_RATING} from '../../const';
import {getDate, getPercent} from '../../utils';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review, key) => {
        const keyValue = key;
        const {user} = review;
        const {dateTime, dateText} = getDate(review.date);
        return (
          <li key={keyValue} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
              </div>
              <span className="reviews__user-name">{user.name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${getPercent(review.rating, MAX_RATING)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {review.comment}
              </p>
              <time className="reviews__time" dateTime={dateTime}>{dateText}</time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewsList;
