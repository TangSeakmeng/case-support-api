import { CustomerDepartment } from '../entity/CustomerDepartment.entity';

export class CustomerDepartmentService {

  public getCustomerDepartments = async () => {
    const departments = await CustomerDepartment.find({ relations: ["createdBy", "updatedBy", "customerCompany"] });
    return departments;
  }

  public getCustomerDepartmentsByCompanyId = async (companyId: string) => {
    try {
      const departments = await CustomerDepartment.createQueryBuilder('tblCustomerDepartment')
        .innerJoinAndSelect('tblCustomerDepartment.customerCompany', 'tblCustomerCompany')
        .where('tblCustomerCompany.id = :companyId', { companyId })
        .getMany();
      return departments;
    } catch (error) {
      console.log(error)
    }
  }

  public getCustomerDepartment = async (customerDepartmentId: string) => {
    const department = await CustomerDepartment.findOne({
      relations: ["createdBy", "updatedBy"],
      where: { id: customerDepartmentId }
    });
    return department;
  }

}
