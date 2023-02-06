import { ErrorMessage, useFormikContext } from "formik";
import * as React from "react";

type FileFieldProps = {
  name: string;
  label: string;
};
export function FileField({ name, label }: FileFieldProps) {
  const { setFieldValue, handleBlur } = useFormikContext();

  return (
    <>
      <label className={"text-white"} htmlFor={name}>
        {label}
      </label>
      <input
        className={"text-white"}
        type="file"
        name="archivo"
        id="archivo"
        accept="image/*,.pdf"
        onChange={(event: Event) => {
          const data: File | null = event?.target?.files[0];
          setFieldValue(name, data);
        }}
        onBlur={handleBlur}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className={"text-red-500"}>{msg}</div>}
      </ErrorMessage>
    </>
  );
}
