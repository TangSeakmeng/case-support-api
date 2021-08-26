import { Supplier } from '../entity/Supplier.entity';

export class SupplierService {

  public getAllsupplierServices = async () => {
    // const users = await User.find({ relations: ["employee_id"] });
    const suppliers = await Supplier.createQueryBuilder('users').getMany();
    return suppliers;
  }

}