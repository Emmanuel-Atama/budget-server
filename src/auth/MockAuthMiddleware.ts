import { Response, NextFunction } from "express";
import Auth from "./Auth";
import AuthenticatedRequest from "./AuthenticatedRequest";

export default class MockAuthMiddleware implements Auth {
    verify(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        req.user = {
            id: 1,
            username: 'Nathan'
        }
        
        next();
    }

}