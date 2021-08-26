import { Request, Response, Router } from 'express';
import {getConnection} from "typeorm";
import { User } from '../entity/User.entity';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../entity/Category.entity';
import { CategoryService } from '../services/categoryService.service';
const categoryRouter = Router();
const categoryService = new CategoryService();

// /api/category/userid
// categoryRouter.get('/userid/:userid', async (req: Request, res: Response) => {
// try {
  //  const { userid } = req.params;
  //  const categories = await categories
  //   .createQueryBuilder(Category, "category")
  //   .where("user.isAdmin = :isAdmin", { isAdmin: true })
  //   .cache("users_admins", 25000)
  //   .getMany();

//     let category = await Category
//       .createQueryBuilder()
//       .select('*')
//       .from(Category, 'category')
//       .innerJoin(
//         query => {
//           return query
//             .from(User, 'users')
//             .select('id as "user_id", "firstName" as "user_firstName", "lastName" as "user_lastName"');
//         },
//         'users',
//         '"user_id" = category."createdBy"'
      // )
      // .getRawMany();

    // let categories = await Category
    //   .createQueryBuilder('categories')
    //   .innerJoinAndSelect("categories.createdBy", "user")
    //   .where("categories.createdBy = :userid")
    //   .setParameters({ userid: User })
    //   .getRawMany();
    
    // console.log(category)
    
  //   return res.status(200).json(categories);
  // } catch (error) {
  //   console.log(error)
  //   }
  // });

// api/category/userid -GET

categoryRouter.get('/userid/:userid', async (req: Request, res: Response) => {

  
  try {
    const userid  = req.params.userid;
    const categories = await Category.createQueryBuilder('category')
    .where("category.createdBy = :userid", { userid: userid })
    .getMany();
    res.status(200).send(categories);
  } catch (error) {
    res.status(501).send(error);
  }
});

// api/category -GET

categoryRouter.get('', async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(501).send(error);
  }
});

// /api/category/create - POST
categoryRouter.post('/create', async (req: Request, res: Response) => {
  try {

    const category = {
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
    const insertCategory: Category = Category.create(category);
    const result = await insertCategory.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

export default categoryRouter;