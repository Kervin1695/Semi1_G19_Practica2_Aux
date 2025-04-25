import { Router } from "express";
import FileController from "../controllers/fileController.js";

const router = Router();

// Get files for a specific user
router.get("/:userId", FileController.getFiles);
// Get a specific file
router.get("/:file_id", FileController.getFile);
// Create a new file
router.post("/uploadFiles/:userId", FileController.createFile);
// Edit an existing file
router.put("/edit/:file_id", FileController.editFile);
// Delete a file
router.delete("/delete/:file_id", FileController.deleteFile);

export default router;