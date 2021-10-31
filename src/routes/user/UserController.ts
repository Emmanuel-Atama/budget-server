import { Request, Response } from "express";
import CreateUser from "../../command/user/CreateUser";
import GetUserById from "../../command/user/GetUserById";
import GetUserByUsername from "../../command/user/GetUserByUsername";
import User from "../../DAL/user/User";
import GetAllUsers from "../../command/user/GetAllUsers";
import CommandBus from "../../command/CommandBus";

export default class UserController {
    private commandBus: CommandBus;
    private bcrypt: any;
    private jwt: any;

    constructor(commandBus: CommandBus, bcrypt: any, jwt: any) {
        this.commandBus = commandBus;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
        
        const users = await this.commandBus.dispatch(new GetAllUsers(limit));
    
        res.json(users);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);

        const user = await this.commandBus.dispatch(new GetUserById(id));

        if (user) {
            res.json(user);
            return;
        }
        
        res.status(404).json({ error: `No user found with ID ${id}`});
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const {
                username,
                password
            } = req.body;
    
            await this.commandBus.dispatch(new CreateUser(new User(0, username, password, new Date)));
            const createdUser = await this.commandBus.dispatch(new GetUserByUsername(username));

            if (createdUser) {
                this.jwt.sign(
                    { id: createdUser.id, username: createdUser.username },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRY },
                    (error: any, token: string) => {
                        if (error) {
                            res.status(500).json({
                                error: 'Something went wrong while logging in.'
                            });
                            return;
                        }

                        res.json({ token });
                    }
                );

                return;
            }

            res.status(500).json({ error: 'Something went wrong during sign up.' });
        } catch (e: any) {
            console.log(e);
            res.status(500).json({
                error: e
            });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const {
                username,
                password
            } = req.body;
    
            const user = await this.commandBus.dispatch(new GetUserByUsername(username));
            console.log("user", user);
    
            if (user) {
                const compared = await this.bcrypt.compare(password, user.password)
                console.log("compared", compared)
                if (compared) {
                    this.jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRY },
                        (error: any, token: string) => {
                            if (error) {
                                res.status(500).json({
                                    error: 'Something went wrong while logging in.'
                                });
                                return;
                            }
    
                            res.json({ token });
                        }
                    );

                    return;
                }
            }
    
            res.status(400).json({ error: 'Invalid username and/or password.' });
        } catch (e) {
            res.status(500).json({ error: 'Something went wrong. This might not be your fault.' });
        }
    }
}
