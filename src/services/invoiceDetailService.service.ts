
import { InvoiceDetail } from '../entity/InvoiceDetail.entity';

export class InvoiceDetailService {

  public getAllInvoiceDetails = async () => {
    const invoiceDetails = await InvoiceDetail.find({ relations: ["invoice", "menu"] });
    return invoiceDetails;
  }

}