import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { sendCodeController, verifyCodeController } from './controllers/authCode';
import { validateRequest } from './middlewares/validateRequest';
import { errorHandler } from './middlewares/errorHandler';
import { sendCodeSchema, verifyCodeSchema } from './schemas/authCode';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.info("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.get('/', (req, res) => {
  res.json({ message: 'API running!' });
});

app.post('/auth/send-code', validateRequest(sendCodeSchema), sendCodeController);

app.patch('/auth/verify-code', validateRequest(verifyCodeSchema), verifyCodeController);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});