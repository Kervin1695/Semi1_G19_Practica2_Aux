import { useState } from "react";
import React from "react";
import UploadFileModal from "./UploadFileModal";
import "../styles/filterSidebar.css";

const FilterSidebar = ({ selectedFilters, setSelectedFilters, refreshView, user }) => {
    const [isUploadingFile, setIsUploadingFile] = useState(false);

    const stages = ["Texto", "Imagen"];

    const handleFilterChange = (tipo) => {
        if (selectedFilters.includes(tipo)) {
            setSelectedFilters(selectedFilters.filter((item) => item !== tipo));
        } else {
            setSelectedFilters([...selectedFilters, tipo]);
        }
    };

    const handleFilterClick = () => {
        setSelectedFilters([]);
    };

    const handleUploadFileClick = () => {
        setIsUploadingFile(true);
        console.log(isUploadingFile)
    }

    return (
        <div className="filter-sidebar">
            <h3>Aplicar filtro:</h3>
            {stages.map((tipo) => (
                <label key={tipo} className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={selectedFilters.includes(tipo)}
                        onChange={() => handleFilterChange(tipo)}
                    />
                    {tipo}
                </label>
            ))}
            <button className="clean-button" onClick={handleFilterClick}>Limpiar Selección</button>
            <button className="upload-button" onClick={handleUploadFileClick}>Subir Archivo</button>
            {isUploadingFile && <UploadFileModal onClose={() => setIsUploadingFile(false)} refreshView={refreshView} user={user} /> }
        </div>
    );
};

export default FilterSidebar;
