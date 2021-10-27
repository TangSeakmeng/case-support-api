import { User } from '../entity/User.entity';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const findByCredentials = async (email: string, password: string) => {
  const user = await User.createQueryBuilder('users')
    .where('users.email = :email')
    .setParameters({ email: email })
    .getOne();

  if (!user) throw new Error('Unable to login');
  const isMatch = await comparePassword(password, user.password, user.salt);
  if (!isMatch) throw new Error('Unable to login')
  return user;
}

export const generateAuthToken = async (user: any) => {
  const token = jwt.sign({
    _id: user.id.toString()
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d'
  });

  return token
}

export const hashPassword = async (password: any) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return { password: hashedPassword, salt: salt };
}

export const comparePassword = async (formPassword: any, dbPassword: any, salt: any) => {
  const hash = await bcrypt.hash(formPassword, salt);
  return hash === dbPassword;
}