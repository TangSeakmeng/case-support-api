import { Request, Response, Router } from 'express';
import { generateAuthToken, findByCredentials, hashPassword } from '../services/auth.service';
import { User } from '../entity/User.entity';
import auth from '../middlewares/auth';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../services/userService.service';

const userRouter = Router();
const userService = new UserService();

// console.log(req.query) -- get data from params


// get all users
// localhost:3000/api/users
// localhost:3000/api/users?hello=world
userRouter.get('',auth, async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(501).send(error);
  }
});


// get one user
// localhost:3000/api/users/getUser
userRouter.get('/getUser',auth, async (req: Request, res: Response) => {
  try {
    const user = await User.createQueryBuilder('users').getOne();
    res.status(200).send(user);
  } catch (error) {
    res.status(501).send(error);
  }
});


// create user
// localhost:3000/api/users/create
userRouter.post('/create',auth, async (req: Request, res: Response) => {
  try {
    const hashResult = await hashPassword(req.body.password);

    const user = {
      id: uuidv4(),
      username: req.body.username,
      email: req.body.email,
      password: hashResult.password,
      salt: hashResult.salt,
      age: req.body.age,
      imageDownloadUrl: req.body.imageDownloadUrl,
      imageFilePath: req.body.imageFilePath,
      created_Date: new Date(),
      updated_Date: new Date(),
      token: req.body.token,
      employee_id: req.body.employee_id,
    };

    const insertUser: User = User.create(user);
    const result = await insertUser.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});


// user login
// localhost:3000/api/users/login
userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const user: User = await findByCredentials(req.body.email, req.body.password);
    console.log(user)
    const token = await generateAuthToken(user);
    console.log(token)

    user.token = token;
    await User.save(user);

    delete user.salt;
    delete user.password;

    user.token = token;

    res.status(200).json(user);
  } catch (e) {
      res.status(401).send(`/login Error: ${e}`)
  }
})

export default userRouter;