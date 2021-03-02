import axios from 'axios';
import { Dispatch } from 'react';
import createUrl from '../../utils/createUrl';
import typedAction from '../shared/typedAction';

export const FETCH_GAMES_SUCCESS = 'games/FETCH_GAMES_SUCCESS';
export const FETCH_GAMES_FAIL = 'games/FETCH_GAMES_FAIL';
export const FETCH_GAME_SUCCESS = 'games/FETCH_GAME_SUCCESS';
export const FETCH_GAME_FAIL = 'games/FETCH_GAME_FAIL';
export const FETCH_PLATFORMS_SUCCESS = 'platforms/FETCH_PLATFORMS_SUCCESS';
export const FETCH_PLATFORMS_FAIL = 'platforms/FETCH_PLATFORMS_FAIL';
export const FETCH_GENRES_SUCCESS = 'genres/FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAIL = 'genres/FETCH_GENRES_FAIL';
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

export interface IPlatform {
  _id: string;
  name: string;
  createdAt: Date;
  updateddAt: Date;
}
export interface IGenre {
  _id: string;
  name: string;
  createdAt: Date;
  updateddAt: Date;
}

export interface IGame {
  _id: string;
  name: string;
  platform: {
    _id: string;
    name: string;
  };
  genres: {
    _id: string;
    name: string;
  }[];
  editors: string[];
  developers: string[];
  owner: string;
  completed: boolean;
  platinum: boolean;
  nowPlaying: boolean;
  physical: boolean;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  cover: string;
}

interface IGameState {
  games: IGame[] | null;
  platforms: IPlatform[] | null;
  genres: IGenre[] | null;
  currentGame: IGame | null;
  loading: boolean;
  error: IError[] | string | null;
}

const initialState: IGameState = {
  games: null,
  platforms: null,
  genres: null,
  currentGame: null,
  loading: true,
  error: null,
};

const fetchGamesSuccess = (games: IGame[]) => typedAction(FETCH_GAMES_SUCCESS, games);
const fetchGamesFail = (error: IError | string) => typedAction(FETCH_GAMES_FAIL, error);
const fetchGameSuccess = (game: IGame) => typedAction(FETCH_GAME_SUCCESS, game);
const fetchGameFail = (error: IError | string) => typedAction(FETCH_GAME_FAIL, error);
const fetchPlatformsSuccess = (platforms: IPlatform[]) =>
  typedAction(FETCH_PLATFORMS_SUCCESS, platforms);
const fetchPlatformsFail = (error: IError | string) => typedAction(FETCH_PLATFORMS_FAIL, error);
const fetchGenresSuccess = (genres: IGenre[]) => typedAction(FETCH_GENRES_SUCCESS, genres);
const fetchGenresFail = (error: IError | string) => typedAction(FETCH_GENRES_FAIL, error);

export type GameAction = ReturnType<
  | typeof fetchGamesSuccess
  | typeof fetchGamesFail
  | typeof fetchGameSuccess
  | typeof fetchGameFail
  | typeof fetchGenresSuccess
  | typeof fetchGenresFail
  | typeof fetchPlatformsSuccess
  | typeof fetchPlatformsFail
>;

export const fetchGamesAsync = () => async (dispatch: Dispatch<GameAction>) => {
  try {
    const res = await axios.get(createUrl('/games?limit=10'));

    dispatch(fetchGamesSuccess(res.data.games));
  } catch (err) {
    dispatch(fetchGamesFail(err.response.data));
  }
};

export const fetchPlatformsAsync = () => async (dispatch: Dispatch<GameAction>) => {
  try {
    const res = await axios.get(createUrl('/platforms'));

    dispatch(fetchPlatformsSuccess(res.data.platforms));
  } catch (err) {
    dispatch(fetchPlatformsFail(err.response.data));
  }
};

export const fetchGenresAsync = () => async (dispatch: Dispatch<GameAction>) => {
  try {
    const res = await axios.get(createUrl('/genres'));

    dispatch(fetchGenresSuccess(res.data.genres));
  } catch (err) {
    dispatch(fetchGenresFail(err.response.data));
  }
};

export const gamesReducer = (state: IGameState = initialState, action: GameAction): IGameState => {
  switch (action.type) {
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        games: action.payload,
        platforms: state.platforms,
        genres: state.genres,
        currentGame: state.currentGame,
        loading: false,
        error: null,
      };
    case FETCH_GAMES_FAIL:
      return {
        ...state,
        games: null,
        platforms: state.platforms,
        genres: state.genres,
        currentGame: state.currentGame,
        loading: false,
        error: action.payload,
      };
    case FETCH_GAME_SUCCESS:
      return {
        ...state,
        games: state.games,
        platforms: state.platforms,
        genres: state.genres,
        currentGame: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_GAME_FAIL:
      return {
        ...state,
        games: state.games,
        platforms: state.platforms,
        genres: state.genres,
        currentGame: null,
        loading: false,
        error: action.payload,
      };
    case FETCH_PLATFORMS_SUCCESS:
      return {
        ...state,
        games: state.games,
        platforms: action.payload,
        genres: state.genres,
        currentGame: state.currentGame,
        loading: false,
        error: null,
      };
    case FETCH_PLATFORMS_FAIL:
      return {
        ...state,
        games: state.games,
        platforms: null,
        genres: state.genres,
        currentGame: state.currentGame,
        loading: false,
        error: action.payload,
      };
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        games: state.games,
        platforms: state.platforms,
        genres: action.payload,
        currentGame: state.currentGame,
        loading: false,
        error: null,
      };
    case FETCH_GENRES_FAIL:
      return {
        ...state,
        games: state.games,
        platforms: state.platforms,
        genres: null,
        currentGame: state.currentGame,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
