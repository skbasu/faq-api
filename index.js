import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectMongoDB, connectRedis } from './config/database.js';
import faqRoutes from './routes/faqRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use('/api', faqRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).send('Server is running...');
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

await connectMongoDB();
await connectRedis();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;