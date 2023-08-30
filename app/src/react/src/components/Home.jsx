import * as React from "react";
import UploadForm from "./form/UploadForm";
import NotificationHub from "./NotificationHub";

export const Home = ({ socket }) => {
  return (
    <div className="flex h-full">
      <div className="w-1/3 flex p-12 flex-col justify-center">
        <UploadForm socket={socket} />
      </div>
      <div className="w-1/3"></div>
      <div className="w-1/3">
        <NotificationHub socket={socket} />
      </div>
    </div>
  );
};
