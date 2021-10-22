import { User } from '../entity/User.entity';

export class UserService {

  public getAllUsers = async () => {
    const users = await User.find({ relations: ["employee_id"] });
    // const users = await User.createQueryBuilder('users').getMany();
    return users;
  }

  public getUser = async (userId: string) => {
    const users = await User.findOne(userId, { relations: ['employee_id'] });
    return users;
  }

  public getUserById = async () => {
    const users = await User
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: 1 })
    .getOne();
  }

}