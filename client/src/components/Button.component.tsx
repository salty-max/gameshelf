import React, { FC } from 'react';
import cx from 'classnames';

interface IButtonProps {
  bgColor?: string;
  textColor?: string;
  text?: string;
  icon?: string;
  full?: boolean;
  circle?: boolean;
  rounded?: boolean;
  onClick?: () => void;
  isSubmit?: boolean;
}

const Button: FC<IButtonProps> = ({
  bgColor = 'gray-darkest',
  textColor = 'white',
  text,
  icon,
  full = false,
  circle = false,
  rounded = false,
  onClick = () => {},
  isSubmit,
}: IButtonProps) => {
  const classes = cx({
    'w-full': full,
    'w-10 h-10': circle,
    'py-2 px-4': !circle,
    rounded: !rounded && !circle,
    'rounded-full': rounded || circle,
  });

  return (
    <>
      {isSubmit ? (
        <input
          type="submit"
          value={text}
          className={`${classes} bg-${bgColor} hover:bg-${bgColor}-dark text-${textColor} transition-colors duration-300 cursor-pointer`}
        />
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={`${classes} bg-${bgColor} hover:bg-${bgColor}-dark text-${textColor} transition-colors duration-300 flex items-center justify-center`}
        >
          {/* Text and icon can be used alone */}
          {icon && <i className={`${text ? 'mr-2 ' : ''}far fa-${icon}`} />}
          {text && <span>{text}</span>}
        </button>
      )}
    </>
  );
};

export default Button;
