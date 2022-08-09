import {changeCityAction} from '../../store/action';
import {useAppSelector, useAppDispatch} from '../../hooks';

type CityProps = {
  city: string
}

function City({city}: CityProps) {
  const {activeCity} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item${activeCity === city ? ' tabs__item--active' : ''}`} onClick={() => dispatch(changeCityAction(city))}>
        <span>{city}</span>
      </a>
    </li>
  );
}

export default City;
