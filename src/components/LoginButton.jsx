import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/subirArchivo");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      className="px-6 py-2 rounded cursor-pointer bg-[#4f9a94]"
      onClick={handleGoogleSignIn}
    >
      Google Login
    </button>
  );
}
