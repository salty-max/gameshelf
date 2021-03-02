/* eslint-disable no-unused-vars */
import React, { FC } from 'react';
import cx from 'classnames';

interface IOption {
  label: string;
  value: any;
}

interface IFieldProps {
  id?: string;
  name: string;
  label?: string;
  hint?: string;
  type?: string;
  options?: IOption[];
  register: any;
  required?: boolean;
}

const Field: FC<IFieldProps> = ({
  id,
  label,
  name,
  hint,
  type = 'text',
  options,
  register,
  required = false,
}) => {
  const wrapperClasses = cx({
    flex: type.toLowerCase() === 'checkbox',
  });

  const labelClasses = cx({
    'mr-4': type.toLowerCase() === 'checkbox',
  });

  return (
    <div className={`pb-6 ${wrapperClasses}`}>
      {label && (
        <label className={labelClasses} htmlFor={name}>
          {label}
        </label>
      )}

      {type.toLowerCase() === 'text' && (
        <input id={id} name={name} type={type} ref={register} required={required} />
      )}
      {type.toLowerCase() === 'number' && (
        <input id={id} name={name} type={type} ref={register} required={required} />
      )}
      {type.toLowerCase() === 'password' && (
        <input id={id} name={name} type={type} ref={register} />
      )}
      {type.toLowerCase() === 'email' && (
        <input id={id} name={name} type={type} ref={register} required={required} />
      )}
      {type.toLowerCase() === 'textarea' && (
        <textarea id={id} name={name} ref={register} required={required} />
      )}
      {type.toLowerCase() === 'checkbox' && (
        <input
          type="checkbox"
          className="form-checkbox h-6 w-6 rounded text-purple border-0 focus:ring-purple focus:border-0"
          required={required}
        />
      )}

      {hint && <span className="text-xs text-gray-dark opacity-40">{hint}</span>}
    </div>
  );
};

export default Field;
