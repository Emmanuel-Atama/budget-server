import { NextFunction, Response } from "express";
import AuthenticatedRequest from "./AuthenticatedRequest";

export default interface Auth {
    verify(req: AuthenticatedRequest, res: Response, next: NextFunction);
}