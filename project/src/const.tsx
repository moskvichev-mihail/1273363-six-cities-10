export const MAX_RATING = 5;

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum OfferType {
  City = 'cities',
  Favorite = 'favorites',
  NearPlace = 'near-places'
}
