import axios from 'axios';
import { Dispatch } from 'react';
import createUrl from '../../utils/createUrl';
import typedAction from '../shared/typedAction';

export const FETCH_GAMES_SUCCESS = 'games/FETCH_GAMES_SUCCESS';
export const FETCH_GAMES_FAIL = 'games/FETCH_GAMES_FAIL';
export const FETCH_GAME_SUCCESS = 'games/FETCH_GAME_SUCCESS';
export const FETCH_GAME_FAIL = 'games/FETCH_GAME_FAIL';
export const ADD_GAME_SUCCESS = 'games/ADD_GAME_SUCCESS';
export const ADD_GAME_FAIL = 'games/ADD_GAME_FAIL';
export const UPDATE_GAME_SUCCESS = 'games/UPDATE_GAME_SUCCESS';
export const UPDATE_GAME_FAIL = 'games/UPDATE_GAME_FAIL';
export const DELETE_GAME_SUCCESS = 'games/DELETE_GAME_SUCCESS';
export const DELETE_GAME_FAIL = 'games/DELETE_GAME_FAIL';
export const CLEAR_ERRORS = 'games/CLEAR_ERRORS';

export interface IError {
  field: string;
  message: string;
}

export interface IGame {
  _id: string;
  name: string;
  platform: string;
  genre: string;
  owner: string;
  completed: boolean;
  platinum: boolean;
  now_playing: boolean;
  release_date: Date;
  created_at: Date;
  cover: string;
}

interface IGameState {
  games: IGame[] | null;
  currentGame: IGame | null;
  loading: boolean;
  error: IError[] | string | null;
}

const initialState: IGameState = {
  games: null,
  currentGame: null,
  loading: true,
  error: null,
};

const fetchGamesSuccess = (games: IGame[]) => typedAction(FETCH_GAMES_SUCCESS, games);
const fetchGamesFail = (error: IError | string) => typedAction(FETCH_GAMES_FAIL, error);
const fetchGameSuccess = (game: IGame) => typedAction(FETCH_GAME_SUCCESS, game);
const fetchGameFail = (error: IError | string) => typedAction(FETCH_GAME_FAIL, error);

export type GameAction = ReturnType<
  typeof fetchGamesSuccess | typeof fetchGamesFail | typeof fetchGameSuccess | typeof fetchGameFail
>;

export const fetchGamesAsync = () => async (dispatch: Dispatch<GameAction>) => {
  try {
    const res = await axios.get(createUrl('/games'));

    dispatch(fetchGamesSuccess(res.data.games));
  } catch (err) {
    dispatch(fetchGamesFail(err.response.data));
  }
};

export const gamesReducer = (state: IGameState = initialState, action: GameAction): IGameState => {
  switch (action.type) {
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        games: action.payload,
        currentGame: state.currentGame,
        loading: false,
        error: null,
      };
    case FETCH_GAMES_FAIL:
      return {
        ...state,
        games: null,
        currentGame: state.currentGame,
        loading: false,
        error: action.payload,
      };
    case FETCH_GAME_SUCCESS:
      return {
        ...state,
        games: state.games,
        currentGame: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_GAME_FAIL:
      return {
        ...state,
        games: state.games,
        currentGame: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
