import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: IUsersRepository;
let fakeMailProvider: IMailProvider;
let sendForgotPassword: SendForgotPasswordEmailService;
let fakeUserTokensRepository: IUserTokensRepository;

describe('SendForgotEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUsersTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPassword = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Should be able to recover password with email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'valid-email',
      password: 'valid-password',
    });

    await sendForgotPassword.execute({
      email: 'valid-email',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover an non-existing user password', async () => {
    await expect(
      sendForgotPassword.execute({
        email: 'invalid-email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'valid-email',
      password: 'valid-password',
    });

    await sendForgotPassword.execute({
      email: 'valid-email',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
