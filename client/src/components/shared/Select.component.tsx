import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import theme from '../../theme';

interface ISelectProps {
  name: string;
  label: string;
  items: {
    value: string;
    label: string;
  }[];
  control: Control;
  isMulti?: boolean;
}

const Select: FC<ISelectProps> = ({ name, label, items, control, isMulti = false }) => {
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      transition: null,
      fontFamily: theme.fontFamily.sans.join(','),
      backgroundColor: theme.backgroundColor.gray.lightest,
      borderRadius: theme.borderRadius.xl,
      borderColor: (state.isFocused || state.isSelected) && theme.borderColor.purple.DEFAULT,
      borderWidth: (state.isFocused || state.isSelected) && theme.borderWidth[2],
      boxShadow: (state.isFocused || state.isSelected) && null,
      '&:hover': {
        borderColor: state.isFocused && theme.borderColor.purple.DEFAULT,
        borderWidth: state.isFocused && theme.borderWidth[2],
      },
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      outline: state.isFocused && theme.outline.none,
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: theme.backgroundColor.gray.dark,
      borderRadius: theme.borderRadius.xxl,
      paddingLeft: theme.padding[2],
      paddingRight: theme.padding[2],
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      fontSize: theme.fontSize.xs,
      color: theme.textColor.white.DEFAULT,
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: theme.textColor.white.DEFAULT,
      '&:hover': {
        backgroundColor: theme.backgroundColor.gray.dark,
        color: theme.textColor.purple.DEFAULT,
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected && theme.backgroundColor.purple.DEFAULT,
      color: state.isSelected && theme.textColor.white.DEFAULT,
      '&:hover': {
        backgroundColor: theme.backgroundColor.gray.DEFAULT,
      },
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused && theme.textColor.purple.DEFAULT,
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: theme.textColor.red.DEFAULT,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontWeight: theme.fontWeight.light,
      color: theme.textColor.gray.dark,
      opacity: theme.opacity[40],
      fontFamily: theme.fontFamily.sans.join(','),
    }),
  };

  return (
    <div className="pb-6">
      <label htmlFor={name}>{label}</label>
      <Controller
        as={ReactSelect}
        options={items}
        name={name}
        isMulti={isMulti}
        control={control}
        styles={customStyles}
      />
    </div>
  );
};

export default Select;
