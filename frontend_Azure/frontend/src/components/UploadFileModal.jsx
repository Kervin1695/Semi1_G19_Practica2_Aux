import React, { useState } from "react";
import { uploadFile, uploadFileToBucket } from "../services/api";
import "../styles/uploadFileModal.css";

const UploadFileModal = ({ onClose, user, refreshView }) => {
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);

    const turnToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const onUpload = async ({ fileName, file }) => {
        const fileType = file.type;

        let tipo = "";
        if (fileType === "text/plain") {
            tipo = "Texto";
        } else if (fileType.startsWith("image/")) {
            tipo = "Imagen";
        } else {
            console.warn("Tipo de archivo no soportado:", fileType);
            return;
        }

        let fileData = {
            name: fileName,
            tipo: tipo,
        };

        if (fileType === "text/plain") {
            try {
                const textContent = await file.text();
                fileData = {
                    ...fileData,
                    content: textContent,
                };
            } catch (error) {
                console.error("Error al leer archivo de texto:", error);
                return;
            }
        } else if (fileType.startsWith("image/")) {
            try {
                const base64File = await turnToBase64(file);
                const base64FileRevised = base64File.substring(base64File.indexOf(",") + 1);
                fileData = {
                    ...fileData,
                    image: base64FileRevised,
                };
            } catch (error) {
                console.error("Error al convertir imagen a base64:", error);
                return;
            }
        } else {
            console.warn("Tipo de archivo no soportado:", fileType);
            return;
        }

        const responseBucket = await uploadFileToBucket(fileData);

        let fileDataToUpload = {
            name: "",
            tipo: "",
            url: "",
        };

        // if (fileType === "text/plain") {
        //     try {
        //         const parsedBody = JSON.parse(responseBucket.body);
        //         const fileUrl = parsedBody.fileUrl;

        //         fileDataToUpload = {
        //             name: fileName,
        //             tipo: tipo,
        //             url: fileUrl,
        //         };

        //     } catch (error) {
        //         console.error("Error al subir el archivo:", error);
        //         return;
        //     }
        // } else if (fileType.startsWith("image/")) {
        //     try {
        //         const parsedBody = JSON.parse(responseBucket.body);
        //         const imageUrl = parsedBody.fileUrl;

        //         fileDataToUpload = {
        //             name: fileName,
        //             tipo: tipo,
        //             url: imageUrl,
        //         };
        //     } catch (error) {
        //         console.error("Error al subir la imagen:", error);
        //         return;
        //     }
        // } else {
        //     console.warn("Tipo de archivo no soportado:", fileType);
        //     return;
        // }


        if (fileType === "text/plain") {
            try {

                if (!responseBucket || !responseBucket.Value || !responseBucket.Value.documentUrl) {
                    console.error("No se pudo obtener la URL del archivo subido");
                    return;
                }
                fileDataToUpload = {
                    name: fileName,
                    tipo: tipo,
                    url: responseBucket.Value.documentUrl,
                };

            } catch (error) {
                console.error("Error al subir el archivo:", error);
                return;
            }
        } else if (fileType.startsWith("image/")) {
            try {
                if (!responseBucket || !responseBucket.Value || !responseBucket.Value.imageUrl) {
                    console.error("No se pudo obtener la URL de la imagen subida");
                    return;
                }
                fileDataToUpload = {
                    name: fileName,
                    tipo: tipo,
                    url: responseBucket.Value.imageUrl,
                };
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                return;
            }
        } else {
            console.warn("Tipo de archivo no soportado:", fileType);
            return;
        }

        console.log("Datos del archivo a subir:", fileDataToUpload);


        try {
            const response = await uploadFile(fileDataToUpload, user);
            console.log("Archivo subido:", response);
            alert("Archivo subido correctamente");
        } catch (error) {
            console.error("Error al subir el archivo:", error);
        }
        console.log("Archivo subido:", fileDataToUpload);
        refreshView();

    };

    const handleUpload = () => {
        if (fileName && file) {
            onUpload({ fileName, file });
            onClose();
        } else {
            alert("Por favor, complete ambos campos");
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type;
            if (fileType === "text/plain" || fileType === "image/jpeg") {
                setFile(selectedFile);
            } else {
                alert("Solo se permiten archivos .txt o .jpg");
                event.target.value = null;
            }
        }
    };

    // if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Subir Archivo</h2>
                <input
                    type="text"
                    placeholder="Nombre del archivo"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="name-input"
                />
                <input
                    type="file"
                    accept=".txt,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="file-input"
                />
                <button className="modal-button" onClick={handleUpload}>Guardar</button>
                <button className="modal-button" onClick={onClose}>Cancelar</button>
            </div>
        </div>

    );
};

export default UploadFileModal;
