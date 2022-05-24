import googleDriveService from "./service/service.js";

import fs from "fs";

//import toReadableStream from "to-readable-stream";

/**
 * Crea el contenedor para el archivo a partir de los datos dados por el usuario e intenta subir el archivo
 * @param file: contiene los datos propios del archivo
 * @param scope: contiene los metadatos respecto al contexto academico del archivo
 * @param result: callback que se utiliza para informar el resultado de la operacion.
 */
function uploadFile(file, scope, result) {
  try {
    let media = {
      mimeType: file.extension,
      body: fs.createReadStream(
        "/home/juanagustindurefaccini/Downloads/fotodeprueba.png"
      ),
      // toReadableStream(file.byteArray).pipe(process.stdout),
    };

    const fileContainer = {
      name: file.name,
      media: media,
      path:
        "My Drive/ingenieria de sistemas/" +
        scope.anioAcademico.toLowerCase() +
        "/" +
        scope.catedra.toLowerCase() +
        "/" +
        scope.tipo.toLowerCase(),
    };

    const isEmptyMedia = Object.values(media).every((x) => x === null);
    const isEmptyFile = Object.values(fileContainer).every(
      (x) => x === null || x === ""
    );

    if (isEmptyMedia || isEmptyFile) {
      result("Los campos no pueden ser vacios!");
      return;
    }

    googleDriveService.uploadFile(fileContainer, result);
  } catch (error) {
    result(error);
  }
}
/*
CASOTESTING
const file = {
  name: "parcial_objetos_02_05_2009.jpg",
  extension: "image/jpeg",
  source: [1, 2, 3, 4],
};

const scope = {
  catedra: "programacion orientada a objetos",
  tipo: "parciales",
  anioAcademico: "tercero",
};*/

uploadFile(file, scope, function (err, file) {
  if (err) {
    console.log(err);
  } else {
    console.log("Archivo agregado: ", file.data.id);
  }
});

export default uploadFile;
