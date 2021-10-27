import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

import auth from '../middlewares/auth';
import { User } from '../entity/User.entity';

import { UserService } from '../services/user.service';
import { generateAuthToken, findByCredentials, hashPassword } from '../services/auth.service';

const router = Router();
const userService = new UserService();

// usage: get all users
// route: /api/users - GET
router.get('', async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(201).send(users);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: get user by id
// route: /api/users/1 - GET
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUser(userId);
    res.status(201).send(user);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: create user
// route: /api/users - POST
router.post('', async (req: Request, res: Response) => {
  try {
    const hashResult = await hashPassword(req.body.password);

    const user = {
      id: req.body.id || uuidv4(),
      username: req.body.username,
      email: req.body.email,
      password: hashResult.password,
      salt: hashResult.salt,
      isActivated: true,
      isDeleted: false,
      imageDownloadUrl: req.body.imageDownloadUrl || null,
      imageFilePath: req.body.imageFilePath || null,
      token: null,
      createdDate: new Date(),
      updatedDate: new Date(),
    } as User;

    const insertUser: User = User.create(user);
    const result = await insertUser.save();

    return res.status(201).json(result);
  } catch (error) {
    return res.status(501).json(error);
  }
});

// usage: update user
// route: /api/users - PUT
router.put('', async (req: Request, res: Response) => {
  try {
    const userId = req.body.id;
    const user = await userService.getUser(userId);

    if (!user) return res.status(404).json({error: 'user not found'})

    user.username = req.body.username;
    user.email = req.body.email;

    const updatedUser: User = User.create(user);
    const result = await updatedUser.save();

    return res.status(201).json(result);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: delete user
// route: /api/users - DELETE
router.delete('', async (req: Request, res: Response) => {
    try {
    const userId: string = req.body.id;
    const user: User = await userService.getUser(userId);

    if (!user) return res.status(404).json({error: 'user not found'})

    user.isActivated = false;
    user.isDeleted = true;
    await user.save();
    
    return res.status(201).json(user);
  } catch (error) {
    res.status(501).send(error);
  }
});

// usage: user login - authentication
// route: /api/users/login - POST
router.post('/login', async (req: Request, res: Response) => {
  try {
    const user: User = await findByCredentials(req.body.email, req.body.password);
    if (!user) return res.status(404).json({error: 'invalid login'});

    const token = await generateAuthToken(user);
    user.token = token;
    await User.save(user);

    res.status(200).json(user);
  } catch (error) {
    res.status(501).send(error);
  }
})

export default router;