import 'reflect-metadata';

import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm';

import routes from './routes';

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
    message: `Internal server error ${err.stack}`,
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('>> Server started on 3333');
});
