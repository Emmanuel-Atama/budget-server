import { Request } from "express";

export default interface AuthenticatedRequest extends Request {
    user?: { id: number, username: string } | undefined;
}
