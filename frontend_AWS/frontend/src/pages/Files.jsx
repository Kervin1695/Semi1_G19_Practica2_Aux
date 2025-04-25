import React, { useEffect, useState } from "react";
import FilterSidebarFiles from "../components/FilterSidebarFiles";
import FileList from "../components/FileList";
import { fetchFiles } from "../services/api";
import "../styles/tasks.css";

const Files = ({ user }) => {
    const [files, setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchAllFiles = () => {
        fetchFiles(user).then((data) => {
            setFiles(data);
            setFilteredFiles(data);
        });
    };

    useEffect(() => {
        fetchAllFiles();
    }, []);

    useEffect(() => {
        if (selectedFilters.length === 0) {
            setFilteredFiles(files);
        } else {
            setFilteredFiles(
                files.filter((file) => selectedFilters.includes(file.tipo))
            );
        }
    }, [selectedFilters, files]);

    const handleEdit = (file) => {
        setSelectedFile(file);
    };

    const handleModalClose = () => {
        setSelectedFile(null);
        fetchAllFiles();
    };

    const refreshView = () => {
        fetchAllFiles();
    };

    return (
        <div className="file-list-container">
            <FilterSidebarFiles 
                selectedFilters={selectedFilters} 
                setSelectedFilters={setSelectedFilters} 
                refreshView={refreshView} 
                user={user} />
            <div className="file-table">
                <FileList archivos={filteredFiles} />
            </div>
        </div>
    );
};

export default Files;
