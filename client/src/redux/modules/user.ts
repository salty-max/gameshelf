import { Dispatch } from 'react';
import createUrl from '../../utils/createUrl';
import typedAction from '../shared/typedAction';

export type IUser = {
  id: string;
  username: string;
  email: string;
};

type IUserState = {
  user: IUser | null;
  authenticated: boolean;
  error: string | null;
};

const initialState: IUserState = {
  user: null,
  authenticated: false,
  error: null,
};

const login = (user: IUser) => typedAction('user/LOGIN', user);
const logout = () => typedAction('user/LOGOUT');
const setError = (error: string) => typedAction('user/SET_ERROR', error);

export const loginUser = (body: any) => async (dispatch: Dispatch<UserAction>) => {
  try {
    const res = await fetch(createUrl('/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(login(data.user));
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const logoutUser = () => (dispatch: Dispatch<UserAction>) => {
  localStorage.removeItem('user');
  dispatch(logout());
};

export type UserAction = ReturnType<typeof login | typeof logout>;

export const userReducer = (state: IUserState = initialState, action: UserAction): IUserState => {
  switch (action.type) {
    case 'user/LOGIN':
      return { user: action.payload, authenticated: true, error: null };
    case 'user/LOGOUT':
      return { user: null, authenticated: false, error: null };
    case 'user/SET_ERROR':
      return { user: null, authenticated: false, error: action.payload };
    default:
      return state;
  }
};
