import 'reflect-metadata';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

let fakeAppointmentsRepository: IAppointmentsRepository;

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list month availability from a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 4, 10, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 10, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      user_id: 'valid-user-id',
      date: new Date(2020, 5, 11, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'valid-provider-id',
      month: 6,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 9, available: true },
        { day: 10, available: false },
        { day: 11, available: true },
        { day: 12, available: true },
      ]),
    );
  });
});
