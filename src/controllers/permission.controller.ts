import {Response,Request} from "express";
import {Permission} from "../models/permissions.model";
export const getPermissionByUserId = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        const permissions = await Permission.find({user: userId});
        res.status(200).json({
            ok: true,
            errors: {},
            data: {
                permissions
            }
        })
    }catch (exception) {
        res.status(500).json({
            ok: false,
            errors: {
                msg: `Error getting permissions ${exception}`,
            },
            data:{}
        })
    }
}

export const assignPermissionToUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const {permission} = req.body;

        const permissionDB = await Permission.findOne({user:userId, permission});

        if (permissionDB) {
            return res.status(400).json({
                status: false,
                errors: {
                    msg: 'Permission already exists'
                },
                data:{}
            });
        }

        const newPermission = new Permission({user:userId, permission});
        await newPermission.save();
        res.status(201).json({
            ok: true,
            errors: {},
            data: {
                newPermission
            }
        });
    }catch (exception) {
        res.status(500).json({
            ok: false,
            errors: {
                msg: `Creating permissions ${exception}`,
            },
            data:{}
        })
    }
}

export const removePermissionFromUser = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        await Permission.findOneAndDelete({user: userId});
        res.status(200).json({
            ok: true,
            errors: {},
            data: {
                msg: 'Permission removed'
            }
        });
    }catch (exception) {
        res.status(500).json({
            ok: false,
            errors: {
                msg: `Error removing permissions ${exception}`,
            },
            data:{}
        })
    }
}
