import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import IUsersRepository from '../repositories/IUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: IUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show an User profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    const foundUser = await showProfile.execute({
      userId: user.id,
    });

    expect(foundUser).toHaveProperty('name');
    expect(foundUser).toHaveProperty('email');
  });

  it('Should not be able to show an inexistent User profile', async () => {
    await expect(
      showProfile.execute({
        userId: 'invalid-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
