const access = require('../access-drive/data_access');


/**
 * Busqueda de ocurrencia dentro de la lista de archivos
 * @param fileName: nombre del archivo que se quiere subir
 * @param filesFromPath: archivos "hijos" de la carpeta padre del archivo a subir
 * @returns {boolean}: verdadero si existe un archivo con el mismo nombre, falso en caso contrario
 */
function contains(fileName, filesFromPath) {
    for (const tmp of filesFromPath) {
        if (tmp.name === fileName) return true;
    }
    return false;
}


/**
 * Busca al padre del archivo a subir, chequea por elementos repetidos y realiza el insert
 * @param fileContainer:  Contiene todos los datos del archivo a subir
 */
async function uploadFileService(fileContainer) {

    const parent =  await access.getParentFile(fileContainer.path);

    fileContainer.parent = parent;

    const filesFromPath = await access.getChildrenFilesFolder(parent.id);

    if (contains(fileContainer.name, filesFromPath)) 
        throw {message:"Duplicate file \""+ fileContainer.name + "\""};  

    return access.insert(fileContainer);
}


module.exports = {uploadFileService};
