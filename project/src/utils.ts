import {Offer} from './types/offer';
import {SortType} from './const';

export const getDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateTime = date.toISOString().split('T')[0];
  const dateText = date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
  return {dateTime: dateTime, dateText: dateText};
};

export const getPercent = (partialValue: number, totalValue: number) => (100 * partialValue) / totalValue;

export const getOffers = (city: string, offers: Offer[]) => offers.filter((offer) => offer.city.name === city);

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
