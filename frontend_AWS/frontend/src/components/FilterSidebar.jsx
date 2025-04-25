import { useState } from "react";
import React from "react";
import CreateTaskModal from "./CreateTaskModal";
import "../styles/filterSidebar.css";

const FilterSidebar = ({ selectedFilters, setSelectedFilters, refreshView, user }) => {
    const [isCreatingTask, setIsCreatingTask] = useState(false);

    const stages = ["Terminada", "Pendiente"];

    const handleFilterChange = (estado) => {
        if (selectedFilters.includes(estado)) {
            setSelectedFilters(selectedFilters.filter((item) => item !== estado));
        } else {
            setSelectedFilters([...selectedFilters, estado]);
        }
    };

    const handleFilterClick = () => {
        setSelectedFilters([]);
    };

    const handleCreateTaskClick = () => {
        setIsCreatingTask(true);
    }

    return (
        <div className="filter-sidebar">
            <h3>Aplicar filtro:</h3>
            {stages.map((estado) => (
                <label key={estado} className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={selectedFilters.includes(estado)}
                        onChange={() => handleFilterChange(estado)}
                    />
                    {estado}
                </label>
            ))}
            <button className="clean-button" onClick={handleFilterClick}>Limpiar Selección</button>
            <button className="create-button" onClick={handleCreateTaskClick}>Crear Tarea</button>
            {isCreatingTask && <CreateTaskModal onClose={() => setIsCreatingTask(false)} refreshView={refreshView} user={user} /> }
        </div>
    );
};

export default FilterSidebar;
