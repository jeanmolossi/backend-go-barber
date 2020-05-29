import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: IAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to create an Appointment', async () => {
    const appointment = await createAppointment.execute({
      provider_id: 'valid-id',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('Should not be able to create an Appointment with same date', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'valid-provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'valid-provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
