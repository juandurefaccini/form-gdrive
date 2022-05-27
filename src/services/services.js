import axios from "axios";

const url = "http://localhost:8080/";

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

  const request = {
    name: fileData.name,
    extension: fileData.extension,
    catedra: scope.catedra,
    tipo: scope.tipo,
    anioAcademico: scope.anioAcademico,
  };

  formData.append("request", JSON.stringify(request));

  try {
    const res = await axiosClient.post("/", formData, {
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
