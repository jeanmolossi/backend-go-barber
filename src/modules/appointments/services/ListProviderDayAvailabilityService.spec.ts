import 'reflect-metadata';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

let fakeAppointmentsRepository: IAppointmentsRepository;

let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list month availability from a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      date: new Date(2020, 5, 10, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'valid-provider-id',
      date: new Date(2020, 5, 10, 12, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date(2020, 5, 10, 11, 0, 0);

      return customDate.getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'valid-provider-id',
      day: 10,
      month: 6,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 14, available: true },
        { hour: 15, available: false },
      ]),
    );
  });
});
