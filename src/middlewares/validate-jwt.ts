import {Request,Response,NextFunction} from "express";
import {verify} from "jsonwebtoken";

interface JwtPayload {
    uid: string,
    name: string,
}

export const validateJWT = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('x-api-key');
    if(!token) {
        return res.status(401).json({
            ok: false,
            errors: {
                msg: 'Token is required',
                location:'header',
            },
            data:{}
        });
    }
    try {
        const {uid, name} = await verify(token, process.env.SECRET_JWT_SEED!) as JwtPayload;
        req.body._id    = uid;
        req.body.name   = name;
       return  next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            errors: {
                msg: 'Token is not valid',
                location:'header',
            },
            data:{}
        });
    }
}
