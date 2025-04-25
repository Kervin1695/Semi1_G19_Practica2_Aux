import React, { useState } from "react";
import Files from "./Files";
import Tasks from "./Tasks";
import "../styles/mainLayout.css";

const MainLayout = ({ user }) => {
    const [activeView, setActiveView] = useState("tasks");
    const [userData, setUserData] = useState(user);

    const renderView = () => {
        switch (activeView) {
            case "tasks":
                return <Tasks user={userData} />;
            case "files":
                return <Files user={userData} />;
            default:
                return <Tasks user={userData} />;
        }
    };

    const handleLogout = () => {
        setUserData(null);
        window.location.reload();
    }

    return (
        <div className="main-layout">
            <header className="header">
                <h1 className="pageName">TaskFlow + CloudDrive</h1>
                <nav className="navbar">
                    <button className="navbarBtn" onClick={() => setActiveView("tasks")}>Tareas</button>
                    <button className="navbarBtn" onClick={() => setActiveView("files")}>Archivos</button>
                </nav>
                <div className="user-info">
                    <span>{user["username"]}</span>
                    <div className="user-icon">🧑‍⚕️</div>
                    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </header>
            <main className="content">{renderView()}</main>
        </div>
    );
};

export default MainLayout;
