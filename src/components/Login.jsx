import React from "react";
import LoginButton from "./LoginButton";
import GoogleDriveIcon from "../assets/google-drive-icon.svg";

export default function Login() {
  return (
    <div className="flex justify-center items-center  w-full h-full space-y-3">
      <div className="w-full flex justify-center">
        <div className="w-1/2 text-center bg-white rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <h1 className="text-4xl text-left ">Bienvenido</h1>
          <p className="text-l text-left mt-2.5">
            Este es el formulario de subida de archivos para el Almacenamiento
            remoto compartido. Para iniciar la aplicacion primero debe iniciar
            sesión
          </p>
          <LoginButton />
        </div>
      </div>
      <div className="flex w-full h-full">
        <img
          src={GoogleDriveIcon}
          className="w-2/3 mx-auto"
          alt="website logo"
        />
      </div>
    </div>
  );
}
