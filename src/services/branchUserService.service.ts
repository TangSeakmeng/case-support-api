
import { Branch_user } from '../entity/Branch_user.entity';

export class BranchUserService {

  public getAllBranchUsers = async () => {
    const branch_users = await Branch_user.find({ relations: ["branch", "user"] });
    return branch_users;
  }

}