
import { Branch } from '../entity/Branch.entity';

export class BranchService {

  public getAllBranches = async () => {
    // const brands = await Category.createQueryBuilder('category').getMany();
    const branches = await Branch.find({ relations: ["createdBy", "updatedBy"] });
    return branches;
  }

}