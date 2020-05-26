import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

routes.get('/', (request, response) =>
  response.json({ message: 'Hello GoStack 11!' }),
);

export default routes;
