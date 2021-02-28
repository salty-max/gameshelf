import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import GameItem from '../components/Dashboard/GameItem.component';
import { AppActions, RootState, useTypedSelector } from '../redux';
import { fetchGamesAsync } from '../redux/modules/games';

const Dashboard = () => {
  const { games } = useTypedSelector((state) => state.games);
  const dispatch: ThunkDispatch<RootState, unknown, AppActions> = useDispatch();
  const fetchGames = () => dispatch(fetchGamesAsync());

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <section className="p-6">
      <div className="pt-6 pb-10">
        <h2 className="font-semibold text-3xl">Dashboard</h2>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-start-1 col-span-2">
          <h3 className="text-xl">Games</h3>
          <div className="mt-4">
            {games && games.map((game) => <GameItem key={game._id} {...game} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
