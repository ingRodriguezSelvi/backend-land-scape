import {NextFunction} from "express";
import {Request, Response} from "express";
export const hasPermission = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.header('x-api-key')) {
            return res.status(500).json({
                msg: 'Se requiere verificar el rol sin validar el token primero'
            });
        }
        const {permission, name} = req.body;
        if (!roles.includes(permission)) {
            return res.status(401).json({
                msg: `${name} no tiene permisos para realizar esta acción`
            });
        }
        next();
    }
}
