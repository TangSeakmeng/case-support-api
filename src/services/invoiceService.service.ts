
import { Invoice } from '../entity/Invoice.entity';

export class InvoiceService {

  public getAllInvoices = async () => {
    // const categories = await Category.createQueryBuilder('category').getMany();
    const invoices = await Invoice.find({ relations: ["createdBy", "updatedBy"] });
    return invoices;
  }

}