import { Usuario } from '../models/usuario.js';

class AuthController {
    async register(req, res) {
        const { name, username, password, email, profilePicture } = req.body;

        try {
            const user = await Usuario.create({
                nombre: name,
                username: username,
                password: password,
                email: email,
                foto_perfil: profilePicture,
            });
            res.status(201).json({ respuesta: 1, message: "Register successful" });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: "Username or email already exists." });
            }
            console.error("Error during registration:", error);
            res.status(500).json({ error: "An error occurred while registering." });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await Usuario.findOne({ where: { username, password } });
            if (!user) {
                return res.status(401).json({ error: "Invalid username or password" });
            }

            res.status(200).json({ respuesta: 1, message: "Login successful", user });
        } catch (error) {
            res.status(500).json({ error: "An error occurred during login." });
        }
    }
}

export default new AuthController();