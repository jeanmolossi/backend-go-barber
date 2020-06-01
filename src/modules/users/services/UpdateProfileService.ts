import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    oldPassword,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User not found!');

    const userWithEmailExists = await this.usersRepository.findByEmail(email);

    if (userWithEmailExists && userWithEmailExists.id !== userId)
      throw new AppError('E-mail already in use');

    user.name = name;
    user.email = email;

    if (password && !oldPassword)
      throw new AppError('You must provide the old password');

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword)
        throw new AppError('Wrong credentials, verify it and try again');

      user.password = await this.hashProvider.generateHash(password);
    }

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}

export default UpdateProfileService;
