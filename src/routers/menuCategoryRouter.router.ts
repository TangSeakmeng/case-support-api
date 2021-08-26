import { Request, Response, Router } from 'express';
import { User } from '../entity/User.entity';
import { v4 as uuidv4 } from 'uuid';
import { Menu_category } from '../entity/Menu_category.entity';
import { MenuCategoryService } from '../services/MenucategoryService.service';
const menuCategoryRouter = Router();
const menuCategoryService = new MenuCategoryService();

// api/menuCategory -GET

menuCategoryRouter.get('', async (req: Request, res: Response) => {
    try {
      const menu_categories = await menuCategoryService.getAllMenuCategories();
      res.status(200).send(menu_categories);
    } catch (error) {
      res.status(501).send(error);
    }
  });
  
  // /api/menuCategory/create - POST
  menuCategoryRouter.post('/create', async (req: Request, res: Response) => {
    try {
  
      const menu_category = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        is_published: req.body.is_published,
        is_deleted: req.body.is_deleted,
        imageDownloadUrl: req.body.imageDownloadUrl,
        imageFilePath: req.body.imageFilePath,
        created_Date: new Date(),
        updated_Date: new Date(),
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy,
      };
      const insertMenu_category: Menu_category = Menu_category.create(menu_category);
      const result = await insertMenu_category.save();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(501).json(error);
    }
  });
  
  export default menuCategoryRouter;