// const API_BASE_URL = "http://semi1p2-aws-1149792564.us-east-2.elb.amazonaws.com";

// const API_BASE_URL_FILES = "http://semi1p2-aws-1149792564.us-east-2.elb.amazonaws.com";

const API_BASE_URL = "http://52.170.205.180";

const API_BASE_URL_FILES = "http://52.170.205.180";

export const fetchTasks = async (user) => {
    console.log(user)

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${user["id"]}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

export const editTask = async (taskId, updatedTask) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/edit/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });
        return await response.json();
    } catch (error) {
        console.error("Error editing task:", error);
    }
}

export const markTaskAsCompleted = async (taskId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/complete`, {
            method: "PUT",
        });
        return await response.json();
    } catch (error) {
        console.error("Error marking task as completed:", error);
    }
}

export const createTask = async (task) => {
    console.log("Creating task:", task);
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating task:", error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/delete/${taskId}`, {
            method: "DELETE",
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

export const registerUser = async (user) => {
    console.log("Registering user:", user);
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        // console.log("Login response:", response.json());
        return await response.json();
    } catch (error) {
        console.error("Error logging in:", error);
    }
}


// export const fetchFiles = async () => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/files`);
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching files:", error);
//         return [];
//     }
// };

export const fetchFiles = async (user) => {
    console.log(user)

    try {
        const response = await fetch(`${API_BASE_URL_FILES}/files/${user["id"]}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching files:", error);
        return [];
    }
};

// export const uploadFileToBucket = async (fileData, user) => {
//     console.log("Uploading file:", fileData);
//     let response;

//     try {
//         if (fileData["tipo"] === "Texto") {
//             console.log("Uploading text file");
//             const fileDataUpdated = {
//                 name: fileData["name"],
//                 tipo: fileData["tipo"],
//                 file: fileData["content"],
//             };
//             response = await fetch(`https://20uvbz47ai.execute-api.us-east-2.amazonaws.com/dev/uploadFile`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(fileDataUpdated),
//             });
//         } else if (fileData["tipo"] === "Imagen") {
//             response = await fetch(`https://20uvbz47ai.execute-api.us-east-2.amazonaws.com/dev/uploadImage`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(fileData),
//             });
//         } else {
//             throw new Error("Tipo de archivo no soportado.");
//         }

//         if (!response.ok) {
//             throw new Error("Error en la respuesta del servidor");
//         }

//         const data = await response.json();
//         console.log("File uploaded successfully:", data);
//         return data;

//     } catch (error) {
//         console.error("Error uploading file:", error);
//         return null;
//     }
// };


export const uploadFileToBucket = async (fileData, user) => {
    console.log("Uploading file:", fileData);
    let response;

    try {
        if (fileData["tipo"] === "Texto") {
            console.log("Uploading text file");
            response = await fetch(`https://practica2semi1a1s2025apimanagementg19.azure-api.net/FuncionCargaDocumentos/CargarDocumentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fileData),
            });
        } else if (fileData["tipo"] === "Imagen") {
            response = await fetch(`https://practica2semi1a1s2025apimanagementg19.azure-api.net/FuncionCargarImage/CargarImagenes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fileData),
            });
        } else {
            throw new Error("Tipo de archivo no soportado.");
        }

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const data = await response.json();
        console.log("File uploaded successfully:", data);
        return data;

    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
};


export const uploadFile = async (fileData, user) => {
    try {
        const response = await fetch(`${API_BASE_URL}/files/uploadFiles/${user["id"]}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fileData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating task:", error);
    }
}