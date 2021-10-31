import { NextFunction, Request, Response } from "express";
import AuthenticatedRequest from "./AuthenticatedRequest";
import jwt, { Secret } from 'jsonwebtoken';

export default class AuthMiddleware {
    verify(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader === 'undefined') {
            res.status(403).json({ error: 'No authorization header provided.' });
            return;
        }

        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        console.log("TOKEN: ", token);

        return jwt.verify(token, process.env.JWT_SECRET as Secret, (error, decoded) => {
            if (error) {
                console.log("ERRRRRRRROR HERE", error);
                res.status(403).json({ error: 'Invalid token provided.' });
                return;
            }

            if (decoded) {
                req.user = {
                    id: decoded.id,
                    username: decoded.username
                }

                return next();
            }
            
            res.status(403).json({ error: 'Invalid token provided.' });
            return;
        });
    }
}