import { Archivo } from "../models/archivo.js";

class FileController {
    
    async getFiles(req, res) {
        const userId = req.params.userId;
        try {
            const files = await Archivo.findAll({ where: { id_usuario: userId } });
            return res.status(200).json(files);
        } catch (error) {
            console.error("Error fetching files:", error);
            return res.status(500).json({ message: "Failed to fetch files." });
        }
    }

    async getFile(req, res) {
        const fileId = req.params.file_id;
        try {
            const file = await Archivo.findOne({ where: { id: fileId } });
            if (file) {
                return res.status(200).json(file);
            } else {
                return res.status(404).json({ message: "File not found." });
            }
        } catch (error) {
            console.error("Error fetching file:", error);
            return res.status(500).json({ message: "Failed to fetch file." });
        }
    }

    async createFile(req, res) {
        const newFile = req.body;
        const userId = req.params.userId;
        try {
            const file = await Archivo.create({
                id_usuario: userId,
                nombre: newFile.name,
                url: newFile.url,
                tipo: newFile.tipo,
            });
            return res.status(201).json({ message: "File created successfully." });
        } catch (error) {
            console.error("Error creating file:", error);
            return res.status(500).json({ message: "Failed to create file." });
        }
    }

    async editFile(req, res) {
        const fileId = req.params.file_id;
        const fileData = req.body;
        try {
            await Archivo.update({ nombre: fileData.nombre, url: fileData.url }, { where: { id: fileId } });
            return res.status(200).json({ message: `File ${fileId} updated successfully.` });
        } catch (error) {
            console.error("Error updating file:", error);
            return res.status(500).json({ message: "Failed to update file." });
        }
    }

    async deleteFile(req, res) {
        const fileId = req.params.file_id;
        try {
            await Archivo.destroy({ where: { id: fileId } });
            return res.status(200).json({ message: `File ${fileId} deleted successfully.` });
        } catch (error) {
            console.error("Error deleting file:", error);
            return res.status(500).json({ message: "Failed to delete file." });
        }
    }

    
}

export default new FileController();