import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  name?: string;
  error?: boolean;
  register?: UseFormRegisterReturn;
  value?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  name,
  error = false,
  register,
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
  };

  // Build className for error state
  const baseClasses = `h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800 ${
    error 
      ? "border-error-500 text-error-800 dark:text-error-400" 
      : "text-gray-800 dark:text-white/90 border-gray-300"
  } ${className}`;

  return (
    <select
      className={baseClasses}
      {...register}
      onChange={(e) => {
        handleChange(e);
        if (register?.onChange) {
          register.onChange(e);
        }
      }}
      defaultValue={defaultValue}
      name={name}
    >
      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
