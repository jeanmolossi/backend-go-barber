import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: IUsersRepository;
let fakeUserTokensRepository: IUserTokensRepository;

let fakeHashProvider: IHashProvider;

let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUsersTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'valid-name',
      email: 'valid-email',
      password: 'valid-password',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      token,
      password: 'new-valid-password',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('new-valid-password');
    expect(updatedUser?.password).toBe('new-valid-password');
  });

  it('Should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'invalid-token',
        password: 'valid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'invalid-user-id',
    );

    await expect(
      resetPassword.execute({
        token,
        password: 'valid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset password if token expired (more than 2h)', async () => {
    const user = await fakeUsersRepository.create({
      name: 'valid-name',
      email: 'valid-email',
      password: 'valid-password',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: 'new-valid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
