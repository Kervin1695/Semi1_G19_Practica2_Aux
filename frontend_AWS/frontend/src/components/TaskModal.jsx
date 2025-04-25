import { useState } from "react";
import { editTask } from "../services/api";
import "../styles/taskModal.css";

const TaskModal = ({ task, onClose, refreshView }) => {
    const [title, setTitle] = useState(task.titulo);
    const [description, setDescription] = useState(task.descripcion);

    const handleSave = () => {
        editTask(task.id, { nombre: title, descripcion: description })
            .then(() => {
                refreshView();
            })
            .catch((error) => {
                console.error("Error al editar la tarea:", error);
            });
        console.log("Título:", title);
        console.log("Descripción:", description);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Editar</h2>
                <textarea className="modal-textarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título"
                />
                <textarea className="modal-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción"
                />
                <button className="modal-button" onClick={handleSave}>Guardar</button>
                <button className="modal-button" onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default TaskModal;
