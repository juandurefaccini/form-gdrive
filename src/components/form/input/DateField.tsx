import * as React from "react";
import moment from "moment/moment";
import { ErrorMessage } from "formik";

type DatePickerProps = {
  name: string;
  label: string;
  disabled?: boolean;
};

export const DateField = ({ name, label, disabled }: DatePickerProps) => {
  return (
    <>
      <label className={"text-white"} htmlFor={name}>
        {label}
      </label>
      <input
        type={"date"}
        name={name}
        defaultValue={moment(new Date()).format("YYYY-MM-DD").toString()}
        required={"required"}
        disabled={disabled}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className={"text-red-500"}>{msg}</div>}
      </ErrorMessage>
    </>
  );
};
