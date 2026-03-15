import React, { useState } from "react";
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
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Build className for error state
  const baseClasses = `h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
    error 
      ? "border-error-500 text-error-800 dark:text-error-400" 
      : selectedValue 
        ? "text-gray-800 dark:text-white/90 border-gray-300" 
        : "text-gray-400 dark:text-gray-400 border-gray-300"
  } ${className}`;

  // If register is provided (from react-hook-form), use it
  const registerProps = register ? {
    ...register,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChange(e);
      // Call the original onChange if it exists
      if (register.onChange) {
        register.onChange(e);
      }
    }
  } : {};

  return (
    <select
      className={baseClasses}
      value={selectedValue}
      onChange={handleChange}
      {...registerProps}
      name={name}
    >
      {/* Placeholder option */}
      <option
        value=""
        disabled
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
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
