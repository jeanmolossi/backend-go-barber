import 'reflect-metadata';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

let fakeAppointmentsRepository: IAppointmentsRepository;

let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list appointments from a provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 11, 16, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 11, 14, 0, 0),
    });

    const appointment3 = await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 11, 15, 0, 0),
    });

    const availability = await listProviderAppointments.execute({
      provider_id: 'valid-provider-id',
      day: 11,
      month: 6,
      year: 2020,
    });

    expect(availability).toEqual([appointment1, appointment2, appointment3]);
  });
});
