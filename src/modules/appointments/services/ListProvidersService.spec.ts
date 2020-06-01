import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: IUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('Should be able to list providers', async () => {
    const userLogged = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@email.com',
      password: 'valid-password',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@email.com',
      password: 'valid-password',
    });

    const providers = await listProviders.execute({
      exceptUserId: userLogged.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
