import express from "express";
import Cors from "cors";
import { dbConnection } from "./db/db.connection";
import {routerHealthCheck, routerUser,routerPermission,routerAccess,routerAuth } from "./routes";

export class Server {
    private app: express.Application;
    private readonly port: number | string;
    private paths: {
        user: string,
        permission: string,
        access: string,
        auth: string,
        healthCheck: string,
    };
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            user:       '/api/user',
            access:     '/api/access',
            permission: '/api/permission',
            auth:       '/api/auth',
            healthCheck:'/api/user/health-check',
        };

        // Connect to database
        this.dbConnection().then();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    // Listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }

    //Routes
    routes() {
        this.app.use(this.paths.user, routerUser);
        this.app.use(this.paths.permission, routerPermission);
        this.app.use(this.paths.access, routerAccess);
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.healthCheck, routerHealthCheck);
    }

    // Middlewares
    middlewares() {
        // CORS
        this.app.use(Cors());
        // Body parser
        this.app.use(express.json());
    }

    async dbConnection() {
        await dbConnection();
    }
}
