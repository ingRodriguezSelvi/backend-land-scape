import {Router} from "express";

const routerHealthCheck = Router();

routerHealthCheck.get('/', (_, res) => {
    res.json({
        ok: true,
        message: 'Server is running'
    });
});

export default routerHealthCheck;
