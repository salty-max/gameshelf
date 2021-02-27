/* eslint-disable no-unused-vars */
import React, { FC, FormEvent, RefObject } from 'react';

interface IOption {
  label: string;
  value: any;
}

interface IFieldProps {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  options?: IOption[];
  register: any;
}

const Field: FC<IFieldProps> = ({ id, label, name, type = 'text', options, register }) => {
  return (
    <div className="pb-6">
      {label && <label htmlFor={name}>{label}</label>}

      {type.toLowerCase() === 'text' && <input id={id} name={name} type={type} ref={register} />}
      {type.toLowerCase() === 'number' && <input id={id} name={name} type={type} ref={register} />}
      {type.toLowerCase() === 'password' && (
        <input id={id} name={name} type={type} ref={register} />
      )}
      {type.toLowerCase() === 'email' && <input id={id} name={name} type={type} ref={register} />}
      {type.toLowerCase() === 'textarea' && <textarea id={id} name={name} ref={register} />}
      {type.toLowerCase() === 'select' && (
        <select id={id} name={name} ref={register}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Field;
