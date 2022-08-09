import {useAppDispatch, useAppSelector} from '../../hooks';
import {setActiveCity} from '../../store/app-process/app-process';
import {getActiveCity} from '../../store/app-process/selectors';

type CityProps = {
  city: string
}

function City({city}: CityProps) {
  const activeCity = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item${activeCity === city ? ' tabs__item--active' : ''}`} onClick={() => dispatch(setActiveCity(city))}>
        <span>{city}</span>
      </a>
    </li>
  );
}

export default City;
