import * as React from "react";
import { ErrorMessage, Field } from "formik";

type Option ={
    label: string;
    value: string;
}

type SelectProps = {
    name: string;
    label: string;
    options: Option[];
    disabled?: boolean;
};

export const SelectField = ({ name, label, options, disabled }: SelectProps) => (
  <div className={"py-1 flex flex-col"}>
    <label className={"text-white"} htmlFor={name}>{label}</label>
    <Field as="select" name={name} disabled={disabled}>
        <option value={""}>Seleccionar</option>
        {
            options.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
            ))
        }
    </Field>
      <ErrorMessage name={name} >{msg => <div className={"text-red-500"}>{msg}</div>}</ErrorMessage>
  </div>
);
