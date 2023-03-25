import * as React from "react";
import { ErrorMessage, Field } from "formik";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  name: string;
  label: string;
  options: Option[];
  disabled?: boolean;
};

export const SelectField = ({
  name,
  label,
  options,
  disabled,
}: SelectProps) => (
  <div>
    <label className="text-sm font-medium" htmlFor={name}>
      {label}
    </label>
    <div className="relative mt-1">
      <Field
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        as="select"
        name={name}
        disabled={disabled}
      >
        <option value={""}>Seleccionar</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <div className={"text-red-500 text-xs mt-2" }>{msg}</div>}
      </ErrorMessage>
    </div>
  </div>
);
