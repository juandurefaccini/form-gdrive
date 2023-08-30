import React from "react";
import LoginButton from "./LoginButton";
import GoogleDriveIcon from "../assets/favicon.svg"; //TODO
import { Card } from "./layout/Card";

export default function Login({ socket }) {
  return (
    <div className="flex justify-center items-center w-full h-full space-y-3">
      <div className="w-full flex justify-center">
        <div className="w-2/3">
          <Card>
            <h1 className="text-2xl text-left ">Bienvenido</h1>
            <p className="text-l text-left mt-2.5">
              Este es el formulario de subida de archivos para el Almacenamiento
              remoto compartido. Para iniciar la aplicacion primero debe iniciar
              sesión
            </p>
            <LoginButton socket={socket} />
          </Card>
        </div>
      </div>
      <div className="flex w-full h-full align-middle h-1/3 justify-end">
        <img src={GoogleDriveIcon} className="w-2/3 " alt="website logo" />
      </div>
    </div>
  );
}
