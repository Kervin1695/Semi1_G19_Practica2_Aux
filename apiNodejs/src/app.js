import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import { sequelize } from './config/database.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is up and running!' });
});


app.use(authRoutes);
app.use('/tasks', taskRoutes);
app.use('/files', fileRoutes);


sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });