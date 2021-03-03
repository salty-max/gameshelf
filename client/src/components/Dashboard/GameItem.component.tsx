/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import getHardwareLogo from '../../utils/getHardwareLogo';
import Button from '../shared/Button.component';

interface IGameItemProps {
  _id: string;
  name: string;
  platform: {
    _id: string;
    name: string;
  };
  completed: boolean;
  platinum: boolean;
  nowPlaying: boolean;
  physical: boolean;
}

const GameItem: FC<IGameItemProps> = ({
  _id,
  name,
  platform,
  completed,
  platinum,
  nowPlaying,
  physical,
}) => {
  const history = useHistory();

  return (
    <article className="px-4 py-2 bg-white rounded-xxl mb-2 last:mb-0 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <div className={`mr-4 flex items-center`}>
          <div className="w-6 h-6 mr-2 flex justify-center items-center">
            {getHardwareLogo(platform.name)}
          </div>
          <i className={`fad fa-${physical ? 'compact-disc' : 'globe-europe'} text-lg`}></i>
        </div>
        <p>{name}</p>
        <div className="grid grid-flow-cols grid-cols-3 auto-cols-max gap-x-2 text-2xl ml-4">
          {nowPlaying && <i className="fad fa-gamepad text-gray-darkest" />}
          {completed && <i className="fad fa-badge-check text-green" />}
          {platinum && <i className="fad fa-gem text-blue" />}
        </div>
      </div>
      <div className="grid grid-flow-cols grid-cols-2 auto-cols-max">
        <Button
          transparent
          bgColor="purple"
          textColor="blue"
          circle
          icon="search"
          onClick={() => history.push(`/games/${_id}`)}
        />
        <Button transparent bgColor="red" textColor="red" circle icon="trash-alt" />
      </div>
    </article>
  );
};

export default GameItem;
