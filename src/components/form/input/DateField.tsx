import * as React from "react";
import moment from "moment/moment";
import { ErrorMessage, useFormikContext } from "formik";

type DatePickerProps = {
  name: string;
  label: string;
  disabled?: boolean;
};

export const DateField = ({ name, label, disabled }: DatePickerProps) => {
  const { setFieldValue } = useFormikContext();
  return (
    <div className="relative max-w-sm">
      <label className={"text-sm font-medium"} htmlFor={name}>
        {label}
      </label>
        <div  className="relative mt-1">
          <input
            type={"date"}
            name={name}
            defaultValue={moment(new Date()).format("YYYY-MM-DD").toString()}
            onChange={(e) => {
              setFieldValue(name, e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={"required"}
            onfocus="this.showPicker()"
            disabled={disabled}
          />
          <ErrorMessage name={name}>
            {(msg) => <div className={"text-red-500 text-xs mt-2"}>{msg}</div>}
          </ErrorMessage>
        </div>
    </div>
  );
};
