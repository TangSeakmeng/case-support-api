import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Menu } from '../entity/Menu.entity';
import { MenuService } from '../services/menuService.service';
const menuRouter = Router();
const menuService = new MenuService();


// api/menu -GET

menuRouter.get('', async (req: Request, res: Response) => {
  try {
    const menus = await menuService.getAllMenus();
    res.status(200).send(menus);
  } catch (error) {
    res.status(501).send(error);
  }
});

menuRouter.get('/:id', async ( req: Request, res: Response) => {
  try {
    //const id= req.params.id;
    // console.log(id)
    const menus = await Menu.createQueryBuilder("menu")
    .where("menu.id = :id", {id: req.params.id})
    .getOne();
    res.status(200).send(menus);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/menu/create - POST
menuRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const menu = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      is_published: req.body.is_published,
      is_deleted: req.body.is_deleted,
      created_Date: new Date(),
      updated_Date: new Date(),
      product_id: req.body.product_id,
      menu_category_id: req.body.menu_category_id,
      imageDownloadUrl:req.body.imageDownloadUrl,
      imageFilePath: req.body.imageFilePath

    };
    const insertMenu: Menu = Menu.create(menu);
    const result = await insertMenu.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default menuRouter;