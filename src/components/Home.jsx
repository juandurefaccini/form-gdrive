import React from "react";
import LoginButton from "./LoginButton";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-full h-full ">
      <h1>Bienvenido</h1>
      <p>
        Este es el formulario de subida de archivos para el Almacenamiento
        remoto compartido
      </p>
      <p>Para iniciar la aplicacion primero debe iniciar sesion</p>
      <LoginButton />
    </div>
  );
}
