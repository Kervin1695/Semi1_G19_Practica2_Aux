import { React, useState, useEffect} from "react";
import "../styles/fileList.css";

const FileList = ({ archivos }) => {

    const handleViewFile = (archivo) => {
        if (archivo.url) {
            window.open(archivo.url, "_blank");
        } else {
            console.log("Ver archivo:", archivo);
            alert(`Nombre: ${archivo.nombre}\nTipo: ${archivo.tipo}`);
        }
    };

    return (
        <div className="file-list-container">
            <h3>Lista de Archivos</h3>
            {archivos.length === 0 ? (
                <p>No hay archivos para mostrar.</p>
            ) : (
                <table className="file-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {archivos.map((archivo, index) => (
                            <tr key={index}>
                                <td>{archivo.nombre}</td>
                                <td>{archivo.tipo}</td>
                                <td>
                                    <button onClick={() => handleViewFile(archivo)}>
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FileList;
