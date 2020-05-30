import { uuid } from 'uuidv4';

import UserTokens from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUsersTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  public async generate(user_id: string): Promise<UserTokens> {
    const user = new UserTokens();

    Object.assign(user, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(user);

    return user;
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = this.userTokens.find(user => user.token === token);

    return userToken;
  }
}

export default FakeUsersTokensRepository;
