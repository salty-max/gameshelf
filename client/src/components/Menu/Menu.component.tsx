import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import { AppActions, RootState, useTypedSelector } from '../../redux';
import { logoutUser } from '../../redux/modules/user';
import Button from '../shared/Button.component';
import MenuItem from './MenuItem.component';

const links = [
  { path: '/dashboard', label: 'Dashboard', icon: 'gamepad' },
  { path: '/profile', label: 'Profile', icon: 'user' },
  { path: '/settings', label: 'Settings', icon: 'cog' },
];

const Menu = () => {
  const {
    push,
    location: { pathname },
  } = useHistory();
  const { user } = useTypedSelector((state) => state.user);
  const dispatch: ThunkDispatch<RootState, unknown, AppActions> = useDispatch();
  const logout = () => dispatch(logoutUser());

  const handleLogout = () => {
    logout();
    push('/login');
  };

  return (
    <aside className="px-4 py-2 col-start-1 col-span-1 h-screen relative">
      <h1 className="font-title text-center text-2xl text-blue">Gameshelf</h1>
      <div className="py-4 grid grid-rows-auto gap-y-4">
        {links.map((link) => (
          <MenuItem
            key={link.path}
            path={link.path}
            label={link.label}
            icon={link.icon}
            active={pathname === link.path}
          />
        ))}
      </div>
      <div className="px-4 py-2 absolute bottom-0 left-0 flex justify-between items-center w-full text-gray-dark">
        <div className="flex items-center">
          <i className="fad fa-user mr-2"></i>
          <span>{user?.username}</span>
        </div>
        <Button
          transparent
          bgColor="red"
          textColor="red"
          circle
          icon="power-off"
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
};

export default Menu;
