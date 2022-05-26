import axios from "axios";
import { getAuth } from "../../utils/auth";

const url = "https://trabajo-sistemas-operativos.herokuapp.com";

const axiosClient = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.defaults.timeout = 5000;

//Send File throug HTTP POST
const postArchivo = async (file, scope, fileData, user) => {
  // Generacion de formData
  const formData = new FormData();
  formData.append("data", file);
  formData.append("scope", scope);
  formData.append("fileData", fileData);
  formData.append("user", user); // TODO : USAR TOKEN

  try {
    const res = await axiosClient.post("/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { postArchivo };
