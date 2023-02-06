import * as React from "react";

export function FormTitle(props: { title: string }) {
    return <div>
        <h1 className={"text-white text-xl"}>{props.title}</h1>
    </div>
}