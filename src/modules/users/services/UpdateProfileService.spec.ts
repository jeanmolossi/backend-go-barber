import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: IUsersRepository;
let fakeHashProvider: IHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update an User profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'jhontre@email.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('jhontre@email.com');
  });

  it('Should not be able to update an unexistent User profile', async () => {
    await expect(
      updateProfile.execute({
        userId: 'invalid-user',
        name: 'John Trê',
        email: 'jhontre@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to change to email already in use', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@email.com',
      password: 'valid-password',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'johntre@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Doe',
      email: 'johntre@email.com',
      oldPassword: 'valid-password',
      password: 'new-valid-password',
    });

    expect(updatedUser.password).toBe('new-valid-password');
  });

  it('Should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'johntre@email.com',
        password: 'new-valid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'johntre@email.com',
        oldPassword: 'wrong-password',
        password: 'new-valid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
