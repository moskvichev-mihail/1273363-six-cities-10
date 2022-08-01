import {Offer} from '../types/offer';
import {users} from './users';

export const offers: Offer[] = [
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
    ],
    'host': users[2],
    'id': 1,
    'images': [
      'img/apartment-01.jpg',
    ],
    'isFavorite': true,
    'isPremium': true,
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.85309666406198,
      'zoom': 10,
    },
    'maxAdults': 4,
    'previewImage': 'img/apartment-01.jpg',
    'price': 120,
    'rating': 4,
    'title': 'Beautiful &amp; luxurious apartment at great location',
    'type': 'Apartment',
  },
  {
    'bedrooms': 10,
    'city': {
      'location': {
        'latitude': 52.369553943508,
        'longitude': 4.85309666406198,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
    ],
    'host': users[1],
    'id': 2,
    'images': [
      'img/room.jpg',
    ],
    'isFavorite': true,
    'isPremium': false,
    'location': {
      'latitude': 52.369553943508,
      'longitude': 4.85309666406198,
      'zoom': 8,
    },
    'maxAdults': 2,
    'previewImage': 'img/room.jpg',
    'price': 80,
    'rating': 4,
    'title': 'Wood and stone place',
    'type': 'Private room',
  },
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.929309666406198,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
    ],
    'host': users[0],
    'id': 3,
    'images': [
      'img/apartment-02.jpg',
    ],
    'isFavorite': true,
    'isPremium': true,
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 10,
    },
    'maxAdults': 4,
    'previewImage': 'img/apartment-02.jpg',
    'price': 132,
    'rating': 4.8,
    'title': 'Canal View Prinsengracht',
    'type': 'Apartment',
  },
  {
    'bedrooms': 5,
    'city': {
      'location': {
        'latitude': 52.3809553943508,
        'longitude': 4.939309666406198,
        'zoom': 10,
      },
      'name': 'Amsterdam',
    },
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'goods': [
      'Heating',
    ],
    'host': users[0],
    'id': 4,
    'images': [
      'img/apartment-03.jpg',
    ],
    'isFavorite': true,
    'isPremium': true,
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 10,
    },
    'maxAdults': 5,
    'previewImage': 'img/apartment-03.jpg',
    'price': 180,
    'rating': 5,
    'title': 'Nice, cozy, warm big bed apartment',
    'type': 'Apartment',
  },
];
