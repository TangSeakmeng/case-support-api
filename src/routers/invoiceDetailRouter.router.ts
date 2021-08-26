import { Request, Response, Router } from 'express';
import { User } from '../entity/User.entity';
import { v4 as uuidv4 } from 'uuid';
import { InvoiceDetail } from '../entity/InvoiceDetail.entity'; 
import { InvoiceDetailService } from '../services/invoiceDetailService.service';
const invoiceDetailRouter = Router();
const invoiceDetailService = new InvoiceDetailService();

// api/invoiceDetail -GET

invoiceDetailRouter.get('', async (req: Request, res: Response) => {
    try {
      const invoiceDetails = await invoiceDetailService.getAllInvoiceDetails();
      res.status(200).send(invoiceDetails);
    } catch (error) {
      res.status(501).send(error);
    }
  });
  
  // /api/invoiceDetail/create - POST
  invoiceDetailRouter.post('/create', async (req: Request, res: Response) => {
    try {
  
      const invoiceDetail = {
        invoice: req.body.invoice,
        menu: req.body.menu,
        qty: req.body.qty,
        price: req.body.price,
        discount: req.body.discount
      };
      const insertInvoiceDetail: InvoiceDetail = InvoiceDetail.create(invoiceDetail);
      const result = await insertInvoiceDetail.save();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(501).json(error);
    }
  });
  
  export default invoiceDetailRouter;