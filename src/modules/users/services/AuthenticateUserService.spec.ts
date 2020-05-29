import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

let fakeHashProvider: IHashProvider;

let fakeUsersRepository: IUsersRepository;
let authUser: AuthenticateUserService;

let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to authenticate an User', async () => {
    const user = await createUser.execute({
      email: 'valid-email',
      name: 'John doe',
      password: 'valid-password',
    });

    const response = await authUser.execute({
      email: 'valid-email',
      password: 'valid-password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate invalid User', async () => {
    await expect(
      authUser.execute({
        email: 'unexisting-email',
        password: 'unexisting-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      email: 'valid-email',
      name: 'valid-name',
      password: 'valid-password',
    });

    await expect(
      authUser.execute({
        email: 'valid-email',
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
