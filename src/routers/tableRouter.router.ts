import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Table } from '../entity/Table.entity';
import { TableService } from '../services/tableService.service';
const tableRouter = Router();
const tableService = new TableService();

// api/table -GET

tableRouter.get('', async (req: Request, res: Response) => {
  try {
    const tables = await tableService.getAllTables();
    res.status(200).send(tables);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/table/create - POST
tableRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const table = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      is_published: req.body.is_published,
      is_deleted: req.body.is_deleted,
      created_Date: new Date(),
      updated_Date: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
    };
    const insertTable: Table = Table.create(table);
    const result = await insertTable.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default tableRouter;