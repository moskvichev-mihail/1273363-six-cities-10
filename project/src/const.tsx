export const MAX_RATING = 5;
export const MAX_REVIEWS = 10;
export const MAX_GALLERY = 6;

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum OfferCardType {
  City = 'cities',
  Favorite = 'favorites',
  NearPlace = 'near-places'
}

export const OfferType = new Map([
  ['apartment', 'Apartment'],
  ['room', 'Private Room'],
  ['house', 'House'],
  ['hotel', 'Hotel'],
]);

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

export enum NameSpace {
  App = 'APP',
  Data = 'DATA',
  User = 'USER',
}

export enum ReviewSendStatus {
  Error = 'ERROR',
  InProcess = 'IN_PROCESS',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN',
}
