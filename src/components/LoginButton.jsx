import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogleSignIn = async (e) => {
    try {
      loginWithGoogle()
        .then(() => {
          navigate("/subirArchivo");
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      className="px-6 py-2 rounded cursor-pointer bg-black text-white"
      onClick={handleGoogleSignIn}
    >
      Google Login
    </button>
  );
}
