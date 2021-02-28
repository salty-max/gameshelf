import React, { FC } from 'react';
import cx from 'classnames';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  textColor?: string;
  text?: string;
  icon?: string;
  full?: boolean;
  circle?: boolean;
  small?: boolean;
  rounded?: boolean;
  transparent?: boolean;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = ({
  type = 'button',
  bgColor = 'gray-darkest',
  textColor = 'white',
  text,
  icon,
  full = false,
  circle = false,
  small = false,
  rounded = false,
  transparent = false,
  onClick = () => {},
}) => {
  const classes = cx({
    'w-full': full,
    'w-10 h-10': circle && !small,
    'w-6 h-6': circle && small,
    'py-2 px-4': !circle,
    rounded: !rounded && !circle,
    'rounded-full': rounded || circle,
    [`bg-transparent hover:bg-${bgColor} text-${bgColor} hover:text-white`]: transparent,
    [`bg-${bgColor} hover:bg-${bgColor}-dark`]: !transparent,
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes}  text-${textColor} transition-colors duration-300 flex items-center justify-center`}
    >
      {/* Text and icon can be used alone */}
      {icon && <i className={`${text ? 'mr-2 ' : ''}fad fa-${icon}`} />}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
