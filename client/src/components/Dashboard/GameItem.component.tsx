import React, { FC } from 'react';
import getHardwareLogo from '../../utils/getHardwareLogo';
import Button from '../shared/Button.component';

interface IGameItemProps {
  name: string;
  platforms: [
    {
      _id: string;
      name: string;
    },
  ];
  completed: boolean;
  platinum: boolean;
  now_playing: boolean;
}

const GameItem: FC<IGameItemProps> = ({ name, platforms, completed, platinum, now_playing }) => {
  return (
    <article className="p-4 bg-white flex items-center rounded-xxl mb-2 last:mb-0 shadow-md flex items-center justify-between">
      <div className="flex">
        <div
          className={`mr-2 grid grid-flow-cols grid-cols-${platforms.length} auto-cols-max gap-x-1`}
        >
          {platforms.map((platform) => (
            <img
              key={platform._id}
              src={getHardwareLogo(platform.name)}
              alt={platform.name}
              className="w-6 h-6"
            />
          ))}
        </div>
        <p>{name}</p>
        <div className="grid grid-flow-cols grid-cols-3 auto-cols-max gap-x-2 text-2xl ml-4">
          {now_playing && <i className="fad fa-gamepad" />}
          {completed && <i className="fad fa-badge-check text-green" />}
          {platinum && <i className="fad fa-gem text-blue" />}
        </div>
      </div>
      <div className="grid grid-flow-cols grid-cols-2 auto-cols-max">
        <Button transparent bgColor="purple" textColor="blue" circle icon="search" />
        <Button transparent bgColor="red" textColor="red" circle icon="trash-alt" />
      </div>
    </article>
  );
};

export default GameItem;
