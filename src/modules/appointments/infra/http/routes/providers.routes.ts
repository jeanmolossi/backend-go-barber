import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providerRoutes = Router();
const providersController = new ProvidersController();

providerRoutes.use(ensureAuthenticated);

providerRoutes.get('/', providersController.index);

export default providerRoutes;
