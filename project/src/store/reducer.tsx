import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {changeCityAction, fillOffersAction} from './action';
import {cities} from '../const';

const initialState = {
  activeCity: cities[0],
  offers: [] as Offer[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fillOffersAction, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
