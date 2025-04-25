import { useState } from "react";
import React from "react";
import TaskModal from "../components/TaskModal";
import { markTaskAsCompleted, deleteTask } from "../services/api";
import "../styles/taskCard.css";

const TaskCard = ({ task, onEdit, refreshView }) => {
    const [isCompleted, setIsCompleted] = useState(task.estado === "Terminada");
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleMarkCompleted = async () => {
        await markTaskAsCompleted(task.id)
        setIsCompleted(true);
        refreshView();
    }

    const handleDelete = async () => {
        await deleteTask(task.id);
        refreshView();
    }

    const closeModal = () => {
        setIsEditing(false);
    }

    const taskClass = isCompleted ? "task-card completed" : "task-card";

    return (
        <div className={taskClass}>
            <div className="task-title"></div>
            <h3>{task.titulo}</h3>
            <div className="task-info">
                <p>{task.descripcion}</p>
            </div>
            <div className="task-date">
                <p>Fecha creación: {task.fecha_creacion}</p>
                <p>Estado: {task.estado}</p>
                <button className="edit-button" onClick={handleEdit}>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '5px' }}>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0-1.41-1.41L15.96 7.59l3.75 3.75 1.41-1.41z" />
                    </svg>
                </button>
                {!isCompleted && (
                    <button className="mark-button" onClick={handleMarkCompleted}>
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '5px' }}>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg> 
                    </button>
                )}
                <button className="delete-button" onClick={handleDelete}>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '5px' }}>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg></button>
            </div>
            {isEditing && <TaskModal task={task} onClose={closeModal} refreshView={refreshView} />}
        </div>
    );
};

export default TaskCard;
