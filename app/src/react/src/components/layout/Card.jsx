import * as React from "react";

export const Card = ({ children }) => {
  return (
    <div className="relative block rounded-xl border border-gray-100 p-8 shadow-xl">
      {children}
    </div>
  );
};
