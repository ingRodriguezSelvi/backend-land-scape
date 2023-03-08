import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const validateInputs = (req:Request,res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
            data:{}
        })
    }
   return  next();
}
