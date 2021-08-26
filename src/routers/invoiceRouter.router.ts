import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Invoice } from '../entity/Invoice.entity';
import { InvoiceService } from '../services/invoiceService.service';
const invoiceRouter = Router();
const invoiceService = new InvoiceService();

// api/invoice -GET

invoiceRouter.get('', async (req: Request, res: Response) => {
  try {
    const categories = await invoiceService.getAllInvoices();
    res.status(200).send(categories);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/invoice/create - POST
invoiceRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const invoice = {
      id: uuidv4(),
      total_discount: req.body.total_discount,
      subtotal: req.body.subtotal,
      is_published: req.body.is_published,
      is_deleted: req.body.is_deleted,
      created_Date: new Date(),
      updated_Date: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
    };
    const insertInvoice: Invoice = Invoice.create(invoice);
    const result = await insertInvoice.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default invoiceRouter;