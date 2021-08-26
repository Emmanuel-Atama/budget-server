import { Application, Request, Response, NextFunction } from "express";

export class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;

        this.app.get('/api', (req: Request, res: Response, next: NextFunction): void => {
            res.send('API has been initialized!');
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`API server listening on port ${port}`));
    }
}