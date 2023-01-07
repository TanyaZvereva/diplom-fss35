import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import {
  registerAsync
} from './AuthSlice';

export function SignUp() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({login: '', password: '', confirm: ''});

  return (
    <div>
      <div >
        <input
          aria-label="Set increment amount"
          value={userData.login}
          onChange={e => setUserData(prev => ({...prev, login: e.currentTarget.value}))}
        />
        <input
          aria-label="Set increment amount"
          type="password"
          value={userData.password}
          onChange={e => setUserData(prev => ({...prev, password: e.currentTarget.value}))}
        />
        <input
          aria-label="Set increment amount"
          type="password"
          value={userData.confirm}
          onChange={e => setUserData(prev => ({...prev, confirm: e.currentTarget.value}))}
        />
        <button
          onClick={() => dispatch(registerAsync(userData))}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
