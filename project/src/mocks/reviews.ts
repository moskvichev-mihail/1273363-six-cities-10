import {Review} from '../types/review';
import {users} from './users';

export const reviews: Review[] = [
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': 'Tue Feb 22 2022 19:45:12 GMT+0300 (Москва, стандартное время)',
    'id': 1,
    'rating': 4,
    'user': users[0],
  },
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': 'Tue Feb 23 2022 19:45:12 GMT+0300 (Москва, стандартное время)',
    'id': 2,
    'rating': 3,
    'user': users[1],
  },
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': 'Tue Feb 24 2022 19:45:12 GMT+0300 (Москва, стандартное время)',
    'id': 3,
    'rating': 5,
    'user': users[2],
  },
];
