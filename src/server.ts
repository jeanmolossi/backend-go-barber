import 'reflect-metadata';

import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import routes from './routes';
import uploadConfig from './configs/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      error: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('>> Server started on 3333');
});