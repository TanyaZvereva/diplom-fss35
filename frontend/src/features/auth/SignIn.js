import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {
  authAsync,
} from './AuthSlice';

export function SignIn() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.user)
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const naviagate = useNavigate()
  useEffect(() => {
    if(token) {
      localStorage.setItem('token', token)
      naviagate('/admin')
    }
  }, [token])
  return (
    <main>
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>
      <section className="login">
        <header className="login__header">
          <h2 className="login__title">Авторизация</h2>
        </header>
    <div className="login__wrapper">
      <div className="login__form">
        <label className="login__label">
          <input
            className="login__input"
            aria-label="Set increment amount"
            value={login}
            onChange={event => setLogin(event.target.value)}
          />
        </label>
        <label className="login__label">
          <input
            className="login__input"
            aria-label="Set increment amount"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <div className="text-center">
          <button
            className="login__button"
            onClick={() => dispatch(authAsync({login, password}))}
          >
            Авторизоваться
          </button>
        </div>
      </div>
    </div>
      </section>
    </main>
  );
}
