const drive = require('./connection')

/**
 * LLamado a la API para obtener los archivos hijos de el id dado por parametro
 * @param folderId: Id de la carpeta contenedora de archivos
 * @param successCallback: callback para retornas los datos(archivos)
 * @param errorCallback: callback para informar que hubo un error
 */
function getChildrenAPI(folderId, successCallback, errorCallback) {
    drive.build.files.list({
        fields: 'nextPageToken, files(id, name)',
        q: `'${folderId}' in parents`
    }, (err, res) => {
        if (err) errorCallback('La API retorno un error: ' + err);
        successCallback(res.data.files);
    });
}

/**
 * Wrapper sobre la llamada a la API
 * @param folderId: Id de la carpeta contenedora
 * @returns {Promise}: Resultado de la consulta
 */
function getChildrenWrapper(folderId) {
    return new Promise((resolve, reject) => {
        getChildrenAPI(
            folderId,
            (successResponse) => {
                resolve(successResponse);
            },
            (errorResponse) => {
                reject(errorResponse);
            }
        );
    });
}


/**
 * A partir de un id de una carpeta, se buscan las referencias y se retornan las archivos "hijos"
 * @param folderId: Id de la carpeta contenedora
 * @returns {Promise}: Resultado de la consulta (Lista de archivos "hijos") o null en caso de error
 */
async function getFilesFromPath(folderId) {
    return await getChildrenWrapper(folderId);
}


/**
 * Retorna el archivo asociado al nombre dado por parametro
 * @param childrenList: Lista de archivos en la cual se debe buscar
 * @param name: Nombre del archivo que se quiere obtener
 * @returns {File|null}: Retorna el archivo si este es encontrado en la lista, null en otro caso.
 */
function getChildrenPath(childrenList, name) {
    for (const file of childrenList) {
        if(file.name === name)
            return file;
    }
    return null;
}

/**
 * A partir de un path "logico", se comienza la busqueda de las carpetas desde "root", hacia sus hijos, hasta encontrar el path completo
 * y finalmente el padre asociado a dicho path
 * @param path: Path que se  formo a partir de los datos del usuario
 * @returns {Promise|*}: Retorna la carpeta padre y en otro caso, se informa un error con el callback
 */
async function getParent(path) {
    let root = await drive.build.files.get({fileId: "root"});

    root = {
        id: root.data.id,
        name: root.data.name
    }

    let names = path.split("/");
    if (names.length === 1)
        return root;

    for (let i = 1; i < names.length; i++) {
        let childrenList = await getFilesFromPath(root.id);
        if(!childrenList)
            return null;

        let children = getChildrenPath(childrenList, names[i]);
        if(children)
            root = children
        else{
            console.log("El directorio no existe!")
            return null;
        }
    }

    return root;
}

/** todo acomodar comentario
 * Inserta un archivo, en la posicion que le indique su padre
 * @param fileContainer: Contiene todos los datos del archivo a subir
 */
function insertDrive(fileContainer, successCallback, errorCallback) {
    let fileMetadata = {
        name: fileContainer.name,
        parents: [fileContainer.parent.id]
    };

    drive.build.files.create(
        {
            resource: fileMetadata,
            media: fileContainer.media,
            fields: 'id'
        }, (err, res) => {
            if (err) errorCallback('Error al insertar: ' + err);
            successCallback(res.data.files);
        }
    );
}



function wrapperInsert(fileContainer){

    return new Promise((resolve, reject) => {
        insertDrive(
            fileContainer,
            (successResponse) => {
                resolve(successResponse);
            },
            (errorResponse) => {
                reject(errorResponse);
            }
        );
    });
}



function insert(fileContainer){
    return wrapperInsert(fileContainer);
}


module.exports = {getParent, getFilesFromPath, insert};