import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: IUsersRepository;
let fakeStorageProvider: IStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to update an User avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'valid-avatar',
    });

    expect(user.avatar).toBe('valid-avatar');
  });

  it('Should not be able to update an User avatar if users not exists', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'invalid-user-id',
        avatarFilename: 'valid-avatar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should delete old avatar on update new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'valid-password',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'valid-avatar',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'valid-avatar-2',
    });

    expect(deleteFile).toHaveBeenCalledWith('valid-avatar');

    expect(user.avatar).toBe('valid-avatar-2');
  });
});
