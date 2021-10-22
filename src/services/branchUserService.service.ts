
import { Branch_user } from '../entity/Branch_user.entity';

export class BranchUserService {

  public getAllBranchUsers = async () => {
    const branch_users = await Branch_user.find({ relations: ["branch", "user", "user.employee_id"] });
    return branch_users;
  }

  public getBranchUserbyId = async (userId: string) =>{
    const branch_users = await Branch_user.find({ 
      relations: ["branch", "user", "user.employee_id"], 
      where: [{
        user: userId
      }]
    });
    return branch_users.length > 0 ? branch_users[0] : null;
  }

}