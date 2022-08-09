export const MAX_RATING = 5;

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

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

export enum SortType {
  Default = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum UrlMapMarker {
  Default = './img/pin.svg',
  Active = './img/pin-active.svg',
}

export enum MapMarker {
  Width = 27,
  Height = 39,
}
