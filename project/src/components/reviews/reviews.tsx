import React, {useEffect} from 'react';
import {MAX_REVIEWS} from '../../const';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';
import {isAuth, sortReviews} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchReviewsAction} from '../../store/api-actions';
import {getReviews} from '../../store/app-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type ReviewsProps = {
  offerId: number;
}

function Reviews({offerId}: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = sortReviews([...useAppSelector(getReviews)]).slice(0, MAX_REVIEWS);

  useEffect(() => {
    dispatch(fetchReviewsAction(offerId));
  }, [dispatch, offerId]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews}/>
      {isAuth(authorizationStatus) && <ReviewsForm offerId={offerId}/>}
    </section>
  );
}

export default Reviews;
