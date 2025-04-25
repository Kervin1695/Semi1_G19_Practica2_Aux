import { useState } from "react";
import { createTask } from "../services/api";
import "../styles/taskModal.css";

const CreateTaskModal = ({ onClose, refreshView, user }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estado, setEstado] = useState("Pendiente");
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));

    const handleSave = () => {
        console.log("ID de usuario:", user["id"]);
        create({ id_usuario:user["id"], nombre: title, descripcion: description, estado: estado, fecha: fecha })
            .then(() => {
                refreshView();
            })
            .catch((error) => {
                console.error("Error al crear la tarea:", error);
            });
        onClose();
    };

    const create = async (task) => {
        try {
            const response = await createTask(task);
            if (response.status === 201) {
                console.log("Tarea creada:", task);
            } else {
                console.error("Error al crear la tarea:", response.statusText);
            }
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Crear Tarea</h2>
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

export default CreateTaskModal;
