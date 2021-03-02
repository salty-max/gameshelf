import React, { FC } from 'react';
import cx from 'classnames';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  bgColor2?: string;
  textColor?: string;
  text?: string;
  icon?: string;
  full?: boolean;
  circle?: boolean;
  small?: boolean;
  big?: boolean;
  rounded?: boolean;
  transparent?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = ({
  type = 'button',
  bgColor = 'gray-darkest',
  bgColor2 = 'light',
  textColor = 'white',
  text,
  icon,
  full = false,
  circle = false,
  small = false,
  big = false,
  rounded = false,
  transparent = false,
  gradient = false,
  onClick = () => {},
}) => {
  const classes = cx({
    'w-full': full,
    'w-12 h-12 text-lg': circle && big,
    'w-6 h-6 text-sm': circle && small,
    'w-10 h-10': circle && !small && !big,
    'py-2 px-4 text-lg': !circle && big,
    'py-2 px-4 text-sm': !circle && small,
    'py-2 px-4': !circle && !small && !big,
    'rounded-xxl': !rounded && !circle,
    'rounded-full': rounded || circle,
    [`bg-transparent hover:bg-${bgColor} text-${bgColor} hover:text-white`]: transparent,
    [`bg-gradient-to-r from-${bgColor} to-${bgColor2} hover:opacity-60`]: gradient,
    [`bg-${bgColor} hover:bg-${bgColor}-dark`]: !transparent && !gradient,
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes}  text-${textColor} transition-all duration-300 flex items-center justify-center`}
    >
      {/* Text and icon can be used alone */}
      {icon && <i className={`${text ? 'mr-2 ' : ''}far fa-${icon}`} />}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
