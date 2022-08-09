import {AuthorizationStatus, SortType, cities, OfferType} from './const';
import {AuthData} from './types/auth-data';
import {Offer} from './types/offer';
import {Review} from './types/review';

export const getDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateTime = date.toISOString().split('T')[0];
  const dateText = date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
  return {dateTime: dateTime, dateText: dateText};
};

export const getPercent = (partialValue: number, totalValue: number) => (100 * partialValue) / totalValue;

export const filterOffers = (city: string, offers: Offer[]) => offers.filter((offer) => offer.city.name === city);

export const sortOffers = (sort: string, offers: Offer[]) => {
  switch (sort) {
    case SortType.PriceLowToHigh:
      return offers.sort((prev, next) => prev.price - next.price);
    case SortType.PriceHighToLow:
      return offers.sort((prev, next) => next.price - prev.price);
    case SortType.TopRatedFirst:
      return offers.sort((prev, next) => next.rating - prev.rating);
    case SortType.Default:
    default:
      return offers;
  }
};

export const sortReviews = (reviews: Review[]) => {
  if (reviews === []) {
    return reviews;
  }
  return reviews.sort((prev, next) => Date.parse(next.date) - Date.parse(prev.date));
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;
export const isAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Auth;

export const getRandomNumber = (min: number, max: number):number => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomCity = () => cities[getRandomNumber(0, cities.length - 1)];
export const getOfferType = (type: string): string | null => {
  const offerType = OfferType.get(type);
  return offerType ? offerType : null;
};

export const isEmailCorrect = (email: string): boolean => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const isPasswordCorrect = (password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z@#$%^&*_]+$/;
  return regex.test(password);
};

export const isValidAuthData = ({login, password}: AuthData) => isEmailCorrect(login) && isPasswordCorrect(password);
