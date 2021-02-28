import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
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
      <h2>Dashboard</h2>
      {games &&
        games.map((game) => (
          <div key={game._id}>
            <p>{game.name}</p>
            <img src={game.cover} alt={game.name} />
          </div>
        ))}
    </section>
  );
};

export default Dashboard;
