import * as React from "react";
import UploadForm from "./form/UploadForm";
import NotificationList from "./NotificationList";

export const Home = (props) => {
  return (
    <div className="flex h-full">
      <div className="w-1/3 flex p-12 flex-col justify-center">
        <UploadForm />
      </div>
      <div className="w-2/3">
      </div>
    </div>
  );
};
