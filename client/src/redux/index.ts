import { createStore, combineReducers, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { UserAction, userReducer } from './modules/user';
import { GameAction, gamesReducer } from './modules/games';

//TODO: Remove in production
const logger = createLogger();

export const rootReducer = combineReducers({
  user: userReducer,
  games: gamesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppActions = UserAction | GameAction;

// Export already typed selector for easier use in components.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore<RootState, any, any, AppActions>(
  rootReducer,
  applyMiddleware(
    thunk as ThunkMiddleware<RootState, AppActions>,
    logger, //TODO: Remove in production
  ),
);
