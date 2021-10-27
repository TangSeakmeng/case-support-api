import { CustomerDepartment } from '../entity/CustomerDepartment.entity';
import { CustomerCompany } from '../entity/CustomerCompany.entity';

export class CustomerCompanyService {

  public getCustomerCompanies = async () => {
    const companies = await CustomerCompany.find({ relations: ["createdBy", "updatedBy"] });
    return companies;
  }

  public getCustomerCompany = async (customerCompanyId: string) => {
    const company = await CustomerCompany.findOne({ 
      relations: ["createdBy", "updatedBy"],
      where: { id: customerCompanyId }
    });
    return company;    
  }

}
