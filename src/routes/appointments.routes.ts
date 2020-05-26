import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const appointmentRoutes = Router();

appointmentRoutes.use(ensureAuthenticated);

appointmentRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appoinment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appoinment);
});

export default appointmentRoutes;
