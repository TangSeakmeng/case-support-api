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
userRouter.get('', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(501).send(error);
  }
});

// get userbyId
// localhost:3000/api/users/1
userRouter.get('/:userId',auth, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = (await userService.getUser(userId));
    if(user?.password) delete user.password;
    if(user?.salt) delete user.salt;
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

///api/users/:userid
userRouter.put('/:userId/update', async (req: Request, res: Response) => {
  try {
    const hashResult = await hashPassword(req.body.password);
    const userId = req.params.userId;
    // console.log(userId)
    const username = req.body.username;
    const email = req.body.email;
    const password = hashResult.password;
    const salt = hashResult.salt;

    const user = await userService.getUser(userId);

    if (!user) {
      return res.status(404).json({error: 'user not found'})
    }

    if(req.body === undefined){
      res.statusMessage = "please send a valid body to update record";
      res.statusCode = 400;
      res.end();
      return
    }
    const update_user = await User
    .query ("UPDATE users SET username = $1, email = $2, password = $3, salt = $4 WHERE \"id\"= $5",[username, email, password, salt, userId])
    const result = await userService.getUser(userId);
    return res.status(201).json(result);
    
  } catch (error) {
    res.status(501).send(error);
  }
});


// user login
// localhost:3000/api/users/login
userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const user: User = await findByCredentials(req.body.email, req.body.password);
    const token = await generateAuthToken(user);

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