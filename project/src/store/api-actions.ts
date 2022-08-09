import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {redirectToRoute} from './action';
import {loadOffer, loadOffers, loadFavoriteOffers, loadNearbyOffers, loadReviews} from './app-data/app-data';
import {setActiveCityOffers, setReviewSendStatus} from './app-process/app-process';
import {addUserInfo, requireAuthorization} from './user-process/user-process';
import {errorHandle} from '../services/error-handle';
import {APIRoute, AppRoute, AuthorizationStatus, ReviewSendStatus} from '../const';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {UserInfo} from '../types/user-info';
import {Favorite} from '../types/favorite';
import {saveToken, dropToken} from '../services/token';

export const fetchOfferAction = createAsyncThunk(
  'DATA/fetchOffer',
  async (offerId: number) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId.toString()}`);
      store.dispatch(loadOffer(data));
      store.dispatch(fetchNearbyOffersAction(offerId));
    } catch (error) {
      store.dispatch(loadOffer(null));
      errorHandle(error);
    }
  },
);
export const fetchOffersAction = createAsyncThunk(
  'DATA/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
      store.dispatch(setActiveCityOffers(data));
    } catch (error) {
      store.dispatch(loadOffers([]));
      errorHandle(error);
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk(
  'DATA/fetchFavoriteOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      store.dispatch(loadFavoriteOffers(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(loadFavoriteOffers([]));
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk(
  'DATA/fetchNearbyOffers',
  async (offerId: number) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId.toString()}/nearby`);
      store.dispatch(loadNearbyOffers(data));
    } catch (error) {
      store.dispatch(loadNearbyOffers([]));
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'DATA/fetchReviews',
  async (offerId: number) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId.toString()}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      store.dispatch(loadReviews([]));
      errorHandle(error);
    }
  },
);

export const sendReviewAction = createAsyncThunk(
  'APP/postReviews',
  async (params: {review: {comment: string, rating: number}, offerId: number }) => {
    try {
      const {review, offerId} = params;
      const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${offerId.toString()}`, review);
      store.dispatch(setReviewSendStatus(ReviewSendStatus.Success));
      store.dispatch(loadReviews(data));
    } catch (error) {
      store.dispatch(setReviewSendStatus(ReviewSendStatus.Error));
      errorHandle(error);
    }
  },
);

export const setIsFavoriteAction = createAsyncThunk(
  'APP/setIsFavorite',
  async ({offerId, isFavorite, onSuccess}: Favorite) => {
    try {
      await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${Number(isFavorite)}`);
      if (onSuccess !== undefined) {
        onSuccess(isFavorite);
      }
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'USER/checkAuth',
  async () => {
    try {
      const {data} = await api.get<UserInfo>(APIRoute.Login);
      store.dispatch(addUserInfo({
        avatarUrl: data.avatarUrl,
        email: data.email,
        id: data.id,
        isPro: data.isPro,
        name: data.name,
      }));
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      store.dispatch(addUserInfo(null));
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'USER/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      const {token} = data;
      saveToken(token);
      store.dispatch(addUserInfo({
        avatarUrl: data.avatarUrl,
        email: data.email,
        id: data.id,
        isPro: data.isPro,
        name: data.name,
      }));
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(addUserInfo(null));
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'USER/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(addUserInfo(null));
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(redirectToRoute(AppRoute.Login));
    } catch (error) {
      errorHandle(error);
    }
  },
);
