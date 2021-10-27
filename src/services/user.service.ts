import { User } from '../entity/User.entity';

export class UserService {

  public getUser = async (userId: string) => {
    const user = await User.createQueryBuilder('users').where("id = :id", { id: userId }).getOne();
    return user;
  }

  public getUsers = async () => {
    const users = await User.createQueryBuilder('users').getMany();
    return users;
  }

}