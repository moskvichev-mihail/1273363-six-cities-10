import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

export const getOffer = (state: State): Offer | null => state[NameSpace.Data].offer;
export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearbyOffers;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getServerAvailabilityStatus = (state: State): boolean => state[NameSpace.Data].isServerAvailable;
