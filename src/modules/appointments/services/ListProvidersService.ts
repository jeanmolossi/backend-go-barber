import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  exceptUserId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ exceptUserId }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({ exceptUserId });

    return users;
  }
}

export default ListProvidersService;
