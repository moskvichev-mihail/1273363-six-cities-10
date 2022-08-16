import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {isAuth} from '../../utils';
import {AppRoute} from '../../const';
import {fetchFavoriteOffersAction, logoutAction} from '../../store/api-actions';
import {getAuthorizationStatus, getUserInfo} from '../../store/user-process/selectors';
import {getFavoriteOffers} from '../../store/app-data/selectors';
import {useEffect} from 'react';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUserInfo);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const countFavorites = favoriteOffers.length;

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch, countFavorites]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {
                  isAuth(authorizationStatus) ?
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{user ? user.email : ''}</span>
                      <span className="header__favorite-count">{countFavorites}</span>
                    </Link> :
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                }
              </li>
              {
                isAuth(authorizationStatus) &&
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    to={AppRoute.Login}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
