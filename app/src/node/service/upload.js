const googleDriveService = require('./service.js');
const fs = require("fs");

/**
 * Crea el contenedor para el archivo a partir de los datos dados por el usuario e intenta subir el archivo
 * @param file: contiene los datos propios del archivo
 * @param scope: contiene los metadatos respecto al contexto academico del archivo
 */
function uploadFile(file, scope) {

    let media = {
        mimeType: file.extension,
        body: fs.createReadStream(file.pathSource)
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
    
    return googleDriveService.uploadFileService(fileContainer);

}

module.exports = {uploadFile};
