import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import LogOutIcon from "../assets/favicon.svg"; //TODO

export default function TopBar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const location = window.location.pathname;

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full text-gray-900 h-full flex justify-between items-center">
      <span className="px-4 text-lg">Formulario para Google Drive</span>
      {user && location !== "/" && (
        <span className="px-4 cursor-pointer" onClick={handleLogout}>
          Cerrar sesion
          <img
            src={LogOutIcon}
            className="w-4 h-4 inline-block ml-2"
            alt="logout icon"
          />
        </span>
      )}
    </div>
  );
}
