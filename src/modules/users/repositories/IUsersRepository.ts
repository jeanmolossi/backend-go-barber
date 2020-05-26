import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(userEmail: string): Promise<User | undefined>;
  findById(userId: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
