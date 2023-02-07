import { ErrorMessage, useFormikContext } from "formik";
import * as React from "react";

type FileFieldProps = {
  name: string;
  label: string;
};
export function FileField({ name, label }: FileFieldProps) {
  const { setFieldValue, handleBlur } = useFormikContext();

  return (
    <div className="relative max-w-sm">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={name}>Upload file</label>
        <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            name="archivo"
            accept="image/*,.pdf"
            onChange={(event: Event) => {
                const data: File | null = event?.target?.files[0];
                setFieldValue(name, data);
            }}
            onBlur={handleBlur}/>

          <ErrorMessage name={name}>
            {(msg) => <div className={"text-red-500 text-xs mt-2"}>{msg}</div>}
          </ErrorMessage>
    </div>
  );
}
