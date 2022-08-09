import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {loginAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';
import {isEmailCorrect, isPasswordCorrect, isValidAuthData} from '../../utils';

function LoginForm(): JSX.Element {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isValidAuthData({login, password})) {
      dispatch(loginAction({login, password}));
    } else {
      setIsError(true);
    }
  };

  const handleLoginChange = ({target}: ChangeEvent<HTMLInputElement>) => setLogin(target.value);
  const handlePasswordChange = ({target}: ChangeEvent<HTMLInputElement>) => setPassword(target.value);


  useEffect(() => {
    if (isError && isValidAuthData({login, password})) {
      setIsError(false);
    }
  }, [login, password]);

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action=""
        onSubmit={handleFormSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          {isError && !isEmailCorrect(login) && <span style={{color: 'red'}}>Invalid Email Addresses</span>}
          <input
            onChange={handleLoginChange}
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          {isError && !isPasswordCorrect(password) && <span style={{color: 'red'}}>Invalid Password</span>}
          <input
            onChange={handlePasswordChange}
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    </section>
  );
}

export default LoginForm;
