import axios from 'axios';
import { Dispatch } from 'react';
import createUrl from '../../utils/createUrl';
import setAuthToken from '../../utils/setAuthToken';
import typedAction from '../shared/typedAction';

export const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
export const REGISTER_FAIL = 'user/REGISTER_FAIL';
export const LOGIN_FAIL = 'user/LOGIN_FAIL';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const USER_LOADED = 'user/USER_LOADED';
export const LOGOUT = 'user/LOGOUT';
export const AUTH_ERROR = 'user/AUTH_ERROR';
export const CLEAR_ERRORS = 'user/CLEAR_ERRORS';

export type IError = {
  field: string;
  message: string;
};

export type IUser = {
  _id: string;
  username: string;
  email: string;
  created_at: Date;
};

type IUserState = {
  token: string | null;
  user: IUser | null;
  authenticated: boolean;
  loading: boolean;
  error: IError[] | string | null;
};

const initialState: IUserState = {
  token: localStorage.getItem('token'),
  user: null,
  authenticated: false,
  loading: true,
  error: null,
};

const load = (user: IUser) => typedAction(USER_LOADED, user);
const registerSuccess = (token: string) => typedAction(REGISTER_SUCCESS, token);
const registerFail = (error: IError) => typedAction(REGISTER_FAIL, error);
const loginSuccess = (token: string) => typedAction(LOGIN_SUCCESS, token);
const loginFail = (error: IError) => typedAction(LOGIN_FAIL, error);
const logout = () => typedAction(LOGOUT);
const authError = (error: IError) => typedAction(AUTH_ERROR, error);

export type UserAction = ReturnType<
  | typeof load
  | typeof loginSuccess
  | typeof loginFail
  | typeof registerSuccess
  | typeof registerFail
  | typeof logout
>;

export const loadUser = () => async (dispatch: Dispatch<UserAction>) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }

  try {
    const res = await axios.get(createUrl('/auth'));

    dispatch(load(res.data.user));
  } catch (err) {
    dispatch(authError(err.response.data));
  }
};

export const registerUser = (body: object) => async (dispatch: Dispatch<UserAction>) => {
  try {
    const res = await axios.post(createUrl('/auth/register'), body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch(registerSuccess(res.data.token));
  } catch (err) {
    dispatch(registerFail(err.response.data));
  }
};

export const loginUser = (body: object) => async (dispatch: Dispatch<UserAction>) => {
  try {
    const res = await axios.post(createUrl('/auth/login'), body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch(loginSuccess(res.data.token));
  } catch (err) {
    dispatch(loginFail(err.response.data));
  }
};

export const logoutUser = () => (dispatch: Dispatch<UserAction>) => {
  localStorage.removeItem('user');
  dispatch(logout());
};

export const userReducer = (state: IUserState = initialState, action: UserAction): IUserState => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return { token: null, user: null, authenticated: false, loading: false, error: null };
    default:
      return state;
  }
};
