import React from "react";

export default function Alert({ children }) {
  if (children != undefined)
    return <div className="text-sm text-red-400">{children}</div>;

  return <div className="text-sm text-red-400"> </div>;
}
