import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, cities, ReviewSendStatus, SortType} from '../../const';
import {AppProcess} from '../../types/state';
import {filterOffers, sortOffers} from '../../utils';

const initialState: AppProcess = {
  activeCity: cities[0],
  activeCityOffers: [],
  reviewSendStatus: ReviewSendStatus.Unknown,
  sortType: SortType.Default,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setActiveCity: (state, action) => {
      state.activeCity = action.payload;
      state.sortType = SortType.Default;
    },
    setActiveCityOffers: (state, action) => {
      const sortType = state.sortType;
      const unsortedOffers = filterOffers(state.activeCity, action.payload);
      state.activeCityOffers = sortOffers(sortType, unsortedOffers);
    },
    setReviewSendStatus: (state, action) => {
      state.reviewSendStatus = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const {setActiveCity, setActiveCityOffers, setReviewSendStatus, setSortType} = appProcess.actions;
