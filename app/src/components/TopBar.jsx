import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full text-white bg-black h-full flex justify-center items-center">
      <span className="px-4 ">Formulario para Google Drive</span>
      {user && (
        <span className="px-4 cursor-pointer" onClick={handleLogout}>
          Cerrar sesion
        </span>
      )}
    </div>
  );
}