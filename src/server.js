import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';
import usersRouter from './routes/userRoutes.js';
import { errors } from 'celebrate';

const PORT = process.env.PORT ?? 3000;
const app = express();

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(authRouter);
app.use(notesRouter);
app.use(usersRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
