import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: IAppointmentsRepository;
let fakeNotificationsRepository: INotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('Should be able to create an Appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 5, 10, 8).getTime();
      return customDate;
    });

    const appointment = await createAppointment.execute({
      provider_id: 'valid-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 9),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('Should not be able to create an Appointment with same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 5, 10, 8).getTime();
      return customDate;
    });

    const appointmentDate = new Date(2020, 5, 10, 10);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'valid-provider-id',
        user_id: 'valid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 5, 10, 12).getTime();
      return customDate;
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 11),
        provider_id: 'valid-provider-id',
        user_id: 'valid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment with yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 5, 10, 10).getTime();
      return customDate;
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 11),
        provider_id: 'valid-user-id',
        user_id: 'valid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment in out of service hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date(2020, 5, 10, 10).getTime();
      return customDate;
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 7),
        provider_id: 'valid-provider-id',
        user_id: 'valid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 18),
        provider_id: 'valid-provider-id',
        user_id: 'valid-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
