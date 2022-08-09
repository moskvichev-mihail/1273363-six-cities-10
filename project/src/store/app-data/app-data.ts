import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {AppData} from '../../types/state';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

const initialState: AppData = {
  isServerAvailable: true,
  isDataLoaded: false,
  favoriteOffers: [] as Offer[],
  nearbyOffers: [] as Offer[],
  offer: null,
  offers: [] as Offer[],
  reviews: [] as Review[],
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffer: (state, action) => {
      state.offer = action.payload;
      state.isDataLoaded = true;
    },
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadFavoriteOffers: (state, action) => {
      state.favoriteOffers = action.payload;
      state.isDataLoaded = true;
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setLoadedDataStatus: (state, action) => {
      state.isDataLoaded = action.payload;
    },
    setServerAvailabilityStatus: (state, action) => {
      state.isServerAvailable = action.payload;
    },
  },
});

export const {loadOffer, loadOffers, loadFavoriteOffers, loadNearbyOffers, loadReviews, setLoadedDataStatus, setServerAvailabilityStatus} = appData.actions;
