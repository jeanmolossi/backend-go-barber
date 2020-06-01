import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(findAllProvidersData: IFindAllProvidersDTO): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(userEmail: string): Promise<User | undefined>;
  findById(userId: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
