import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import moment from 'moment';

import { AppActions, RootState, useTypedSelector } from '../redux';
import { fetchGameAsync } from '../redux/modules/games';
import getHardwareLogo from '../utils/getHardwareLogo';

interface IGameDetailsParams {
  id?: string;
}

const GameDetails: FC = () => {
  const { id } = useParams<IGameDetailsParams>();
  const { currentGame } = useTypedSelector((state) => state.games);
  const dispatch: ThunkDispatch<RootState, unknown, AppActions> = useDispatch();
  const fetchGame = (gameId: string) => dispatch(fetchGameAsync(gameId));

  useEffect(() => {
    id && fetchGame(id);
  }, []);

  return (
    <section className="p-6">
      {currentGame && (
        <>
          <div className="grid grid-cols-3 gap-x-4 w-2/3">
            <img className="rounded-xxl" src={currentGame.cover} alt={currentGame.name} />
            <div className="col-start-2 col-span-2 bg-white shadow-lg rounded-xxl p-6">
              <h2 className="text-2xl font-semibold">{currentGame.name}</h2>
              <div className="pt-2 flex items-center">
                <div className="flex items-center mr-6">
                  <div className="w-6 h-6 mr-2 flex items-center">
                    {getHardwareLogo(currentGame.platform.name)}
                  </div>
                  <span>{currentGame.platform.name}</span>
                </div>
                {currentGame.releaseDate && (
                  <div className="flex items-center">
                    <i className="fad fa-clock mr-2 text-purple-dark"></i>
                    <span>{moment(currentGame.releaseDate).fromNow()}</span>
                  </div>
                )}
              </div>
              <div className="h-2/3 flex flex-col justify-around">
                <div className="pt-4 flex">
                  {currentGame.genres.map((genre) => (
                    <div
                      key={genre._id}
                      className="px-4 py-2 mr-2 last:mr-0 rounded-full bg-gray-dark text-white text-sm"
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="pt-4 grid grid-flow-row auto-rows-min gap-y-4">
                    <div className="flex">
                      <h3 className="text-purple mr-2">Developers: </h3>
                      <p>{currentGame.developers.join(', ')}</p>
                    </div>
                    <div className="flex">
                      <h3 className="text-purple mr-2">Editors: </h3>
                      <p>{currentGame.editors.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/3 pt-6 grid grid-cols-2 gap-4">
            <div className="shadow-lg text-white font-semibold rounded-xxl p-4 h-40 bg-purple flex flex-col items-center justify-around">
              <i
                className={`fad fa-${
                  currentGame.physical ? 'compact-disc' : 'globe-europe'
                } text-purple-dark text-6xl`}
              ></i>
              {currentGame.physical ? 'Physical version' : 'Dematerialized Version'}
            </div>
            <div className="shadow-lg text-white font-semibold rounded-xxl p-4 h-40 bg-mint flex flex-col items-center justify-around">
              <i
                className={`fad fa-${
                  currentGame.nowPlaying ? 'gamepad' : 'snooze'
                } text-mint-dark text-6xl`}
              ></i>
              {currentGame.nowPlaying ? 'Currently being played' : 'Collecting dust...'}
            </div>
            <div
              className={`shadow-lg font-semibold rounded-xxl p-4 h-40 ${
                currentGame.completed ? 'bg-green text-white' : 'bg-gray-light'
              } flex flex-col items-center justify-around`}
            >
              <i
                className={`fad ${
                  currentGame.completed ? 'fa-badge-check text-green-dark' : 'fa-times'
                } text-6xl`}
              ></i>
              {currentGame.completed ? 'Finished' : 'Not finished yet'}
            </div>
            <div
              className={`shadow-lg font-semibold rounded-xxl p-4 h-40 ${
                currentGame.platinum ? 'bg-blue text-white' : 'bg-gray-light'
              } flex flex-col items-center justify-around`}
            >
              <i
                className={`fad ${
                  currentGame.platinum ? 'fa-gem text-blue-dark' : 'fa-question'
                } text-6xl`}
              ></i>
              {currentGame.platinum ? 'All trophies acquired' : 'Remaining trophies'}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default GameDetails;
