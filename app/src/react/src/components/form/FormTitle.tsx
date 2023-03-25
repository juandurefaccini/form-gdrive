import * as React from "react";

export function FormTitle(props: { title: string }) {
  return (
    <div>
        <h1 className={"text-lg font-medium"}>{props.title}</h1>
    </div>
  );
}
