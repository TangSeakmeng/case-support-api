
import { Employee } from '../entity/Employee.entity';

export class EmployeeService {

  public getAllEmployees = async () => {
    const employees = await Employee.createQueryBuilder('employee').getMany();
    // const employees = await Employee.find({ relations: ["user"] });
    return employees;
  }

}