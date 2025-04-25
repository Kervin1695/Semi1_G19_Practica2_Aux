import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import FilterSidebar from "../components/FilterSidebar";
import TaskModal from "../components/TaskModal";
import { fetchTasks } from "../services/api";
import "../styles/tasks.css";

const Tasks = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const fetchAllTasks = () => {
        fetchTasks(user).then((data) => {
            setTasks(data);
            setFilteredTasks(data);
        });
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    useEffect(() => {
        if (selectedFilters.length === 0) {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(
                tasks.filter((task) => selectedFilters.includes(task.estado))
            );
        }
    }, [selectedFilters, tasks]);

    const handleEdit = (task) => {
        setSelectedTask(task);
    };

    const handleModalClose = () => {
        setSelectedTask(null);
        fetchAllTasks();
    };

    const refreshView = () => {
        fetchAllTasks();
    };

    return (
        <div className="task-list-container">
            <FilterSidebar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} refreshView={refreshView} user={user} />
            <div className="task-cards">
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={() => handleEdit(task)} refreshView={refreshView} />
                ))}
            </div>
            {selectedTask && (
                <TaskModal task={selectedTask} onClose={handleModalClose} refreshView={refreshView} />
            )}
        </div>
    );
};

export default Tasks;
