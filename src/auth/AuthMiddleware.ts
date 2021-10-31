import { NextFunction, Request, Response } from "express";
import AuthenticatedRequest from "./AuthenticatedRequest";
import { Base64 } from 'js-base64';
import jwt, { Secret } from 'jsonwebtoken';

export default class AuthMiddleware {
    verify(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader === 'undefined') {
            res.status(403).json({ error: 'No authorization header provided.' });
            return;
        }

        const bearer = bearerHeader.split(' ');
        const token = Base64.decode(bearer[1]);

        jwt.verify(token, process.env.JWT_SECRET as Secret, (error, decoded) => {
            if (error) {
                res.status(403).json({ error: 'Invalid token provided.' });
                return;
            }

            if (decoded) {
                req.user = {
                    id: decoded.id,
                    username: decoded.username
                }
                
                next();
                return;
            }
            
            res.status(403).json({ error: 'Invalid token provided.' });
            return;
        });

        next();
    }
}