import { Request, Response } from "express";
import CreateUser from "../../command/user/CreateUser";
import GetUserById from "../../command/user/GetUserById";
import GetUserByUsername from "../../command/user/GetUserByUsername";
import User from "../../model/User";
import commandBus from "../../utils/commandBus";
import bcrypt from 'bcrypt';
import GetAllUsers from "../../command/user/GetAllUsers";

export const getById = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);

    const user = await commandBus.dispatch(new GetUserById(id));

    if (user) {
        res.json(user);
        return;
    }
    
    res.status(404).json({ error: `No user found with ID ${id}`});
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            username,
            password
        } = req.body;

        await commandBus.dispatch(new CreateUser(new User(0, username, password, new Date)))
        
        // todo create an auth token and respond with the user id
        res.json({ message: 'User created successfully!' });
    } catch (e) {
        res.status(500).json({
            error: 'Something went wrong. This might not be your fault.'
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            username,
            password // TODO this should be encrypted before being sent
        } = req.body;

        const user = await commandBus.dispatch(new GetUserByUsername(username));

        if (user) {
            const compared = await bcrypt.compare(password, user.password)
            if (compared) {
                res.json(user);
                // todo password was correct, create a cookie!
                return;
            }
        }

        res.status(400).json({ error: 'Invalid username and/or password.' });
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong. This might not be your fault.' });
    }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    
    const users = await commandBus.dispatch(new GetAllUsers(limit));

    res.json(users);
}
