import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

interface IMenuItemProps {
  path: string;
  label: string;
  icon: string;
  active?: boolean;
}

const MenuItem: FC<IMenuItemProps> = ({ path, label, icon, active }) => {
  const classes = cx({
    'bg-gray-lightest text-purple-dark font-semibold': active,
    'bg-white text-gray-dark': !active,
  });
  return (
    <Link
      className={`${classes} hover:bg-purple hover:text-white px-4 py-2 rounded-xxl flex items-center transition-colors duration-300`}
      to={path}
    >
      <div className="w-1/5 flex justify-center">
        <i className={`fad fa-${icon} mr-4 text-xl`} />
      </div>
      <span>{label}</span>
    </Link>
  );
};

export default MenuItem;
