import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from './controllers/notesController.js';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

app.get('/notes', getAllNotes);
app.get('/notes/:noteId', getNoteById);
app.post('/notes', createNote);
app.patch('notes/:noteId', updateNote);
app.delete('/notes/:noteId', deleteNote);

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
