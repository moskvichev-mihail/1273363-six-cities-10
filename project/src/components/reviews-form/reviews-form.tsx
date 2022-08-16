import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {sendReviewAction} from '../../store/api-actions';
import {getReviewSendStatus} from '../../store/app-process/selectors';
import {setReviewSendStatus} from '../../store/app-process/app-process';
import {ReviewSendStatus, MIN_RATING, MAX_RATING, MIN_REVIEWS_TEXT, MAX_REVIEWS_TEXT} from '../../const';

type ReviewsFormProps = {
  offerId: number,
}

function ReviewsForm({offerId}: ReviewsFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const reviewSendStatus = useAppSelector(getReviewSendStatus);

  const isSubmitFormAvailable = rating >= MIN_RATING && rating <= MAX_RATING && comment.length >= MIN_REVIEWS_TEXT && comment.length <= MAX_REVIEWS_TEXT;

  const resetForm = () => {
    setRating(0);
    setComment('');
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const review = {comment, rating};
    dispatch(setReviewSendStatus(ReviewSendStatus.InProcess));
    dispatch(sendReviewAction({review, offerId}));
  };
  const handleRatingChange = ({target}: ChangeEvent<HTMLInputElement>) => setRating(Number(target.value));
  const handleCommentChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => setComment(target.value);

  useEffect(() => {
    if (reviewSendStatus === ReviewSendStatus.InProcess) {
      setIsFormDisabled(true);
      return;
    }

    if (reviewSendStatus === ReviewSendStatus.Success) {
      resetForm();
    }

    setIsFormDisabled(false);
    dispatch(setReviewSendStatus(ReviewSendStatus.Unknown));
  }, [dispatch, offerId, reviewSendStatus]);

  return (
    <form
      className="reviews__form form"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={rating === 5}
          disabled={isFormDisabled}
          onChange={handleRatingChange}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={rating === 4}
          disabled={isFormDisabled}
          onChange={handleRatingChange}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={rating === 3}
          disabled={isFormDisabled}
          onChange={handleRatingChange}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={rating === 2}
          disabled={isFormDisabled}
          onChange={handleRatingChange}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={rating === 1}
          disabled={isFormDisabled}
          onChange={handleRatingChange}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        onChange={handleCommentChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={isFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isFormDisabled || !isSubmitFormAvailable}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
