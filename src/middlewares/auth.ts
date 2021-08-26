import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User.entity';

const auth = async (req: any, res: any, next: any) => {
    try {
        if (!req.header('Authorization'))
            res.status(401).json({ error: "Access Denied!" })

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ id: decoded._id, token: token })

        if(!user)
          throw new Error()

        req.token = token
        req.user = user

        next()
    } catch (e) {
        res.status(401).json({ error: `Error: ${e}` })
    }
}

export default auth