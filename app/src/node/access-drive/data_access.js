const drive = require('./connection')


/**
 * LLamado a la API para obtener los archivos hijos de la carpeta dada por parametro
 * @param folderId: id de la carpeta contenedora de archivos
 * @param successCallback: lista de resultados(archivos)
 * @param errorCallback: mensaje de error
 */
function getChildrenAPI(folderId, successCallback, errorCallback) {
    drive.build.files.list({
        fields: 'nextPageToken, files(id, name)',
        q: `'${folderId}' in parents`
    
    }, (err, res) => {
        if(err) errorCallback(err.message);
        else successCallback(res.data.files);       
    });
}


/**
 * Promise Wrapper sobre la llamada a la API
 * @param folderId: id de la carpeta contenedora
 * @returns {Promise}: lista de archivos hijos de la carpeta
 */
function getChildrenWrapper(folderId) {
    return new Promise((resolve, reject) => {
        getChildrenAPI(
            folderId,
            (successResponse) => { resolve(successResponse); },
            (errorResponse) => { reject(errorResponse); }
        );
    });
}


/**
 * Dado un id de una carpeta, se buscan las referencias y se retornan los archivos "hijos"
 * @param folderId: id de la carpeta contenedora
 * @returns {Promise}: resultado de la consulta (Lista de archivos "hijos")
 */
function getChildrenFilesFolder(folderId) {
    return getChildrenWrapper(folderId);
}


/** 
 * Inserta un archivo, referenciando al padre correspondiente
 * @param fileContainer: contiene todos los datos del archivo a subir
 * @param successCallback: id del archivo agregado 
 * @param errorCallback: mensaje de error
 */
function insertFile(fileContainer, successCallback, errorCallback) {
    let fileMetadata = {
        name: fileContainer.name,
        parents: [fileContainer.parent.id]
    };

    drive.build.files.create({
            resource: fileMetadata,
            media: fileContainer.media,
            fields: 'id'
        }, (err, res) => {
            if (err) errorCallback(err.message);
            else successCallback(fileContainer.name +  " file has been added" +  ", id: " + res.data.id );
        }
    );
}


/**
 * Promise Wrapper sobre la llamada a la API para insertar un archivo
 * @param fileContainer: contiene todos los datos del archivo a subir
 * @returns {Promise}: resultado de la operacion
 */
function wrapperInsert(fileContainer){
    return new Promise((resolve, reject) => {
        insertFile(
            fileContainer,
            (successResponse) => { resolve(successResponse); },
            (errorResponse) => { reject(errorResponse); }
        );
    });
}


/**
 * Inserta un archivo en Google Drive
 * @param fileContainer: datos del archivo
 * @returns {Promise}: resultado de la operacion 
 */
function insert(fileContainer){
    return wrapperInsert(fileContainer);
}


/**
 * Busqueda de un archivo por nombre
 * @param childrenList: lista de archivos en la cual se debe buscar
 * @param name: nombre del archivo que se quiere obtener
 * @returns: retorna el archivo si este es encontrado en la lista, null en otro caso.
 */
function getChildrenPath(childrenList, name) {
    for (const file of childrenList) {
        if(file.name === name)
            return file;
    }
    return null;
}


/**
 * A partir de un path "logico"(Ej: My Drive/tercero/sistemas operativos/parciales), se comienza la busqueda 
 * de las carpetas desde "root"(My Drive) hacia sus capetas hijas, hasta encontrar la ultima capeta del path, 
 * que corresponde a la capeta padre de el archivo que se quiere insertar
 * @param path: path que se  formo a partir de los datos del usuario
 * @returns: retorna la carpeta padre y en otro caso, se informa un error
 */
async function getParentFile(path) {

    let root = await drive.build.files.get({fileId: "root"});

    root = {
        id: root.data.id,
        name: root.data.name
    }

    let names = path.split("/"); // Lista de nombres de carpetas a buscar
    if (names.length === 1)
        return root;   
    
    //Por cada nombre de carpeta contenda en el path
    for (let i = 1; i < names.length; i++) {
        // Obtencion de lista de archivos hijos (Identificados por un id)
        const childrenList = await getChildrenFilesFolder(root.id).catch(
            (error) => {throw Error(error)}
        ); 
        //Busqueda de la carpeta, asociando el nombre con el id   
        let children = getChildrenPath(childrenList, names[i]);

        if(children)
            root = children
        else
            throw {message:"Directory \""+ path + "\" not found"};        
    }

    return root;
}


module.exports = {getParentFile, getChildrenFilesFolder, insert};