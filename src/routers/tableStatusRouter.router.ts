import { Request, Response, Router } from 'express';
import { TableStatusService } from '../services/tableStatusService.service';
import { v4 as uuidv4 } from 'uuid';
import { TableStatus } from '../entity/TableStatus.entity';
const tableStatusRouter = Router();
const tableStatusService = new TableStatusService();

// api/orderStatus -GET

tableStatusRouter.get('', async (req: Request, res: Response) => {
  try {
    const allTableStatus = await tableStatusService.getAllOrderStatus();
    res.status(200).send(allTableStatus);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/orderStatus/create - POST
tableStatusRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const tableStatus = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      order_Number: req.body.order_Number,
    };
    const insertTableStatus: TableStatus = TableStatus.create(tableStatus);
    const result = await insertTableStatus.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default tableStatusRouter;