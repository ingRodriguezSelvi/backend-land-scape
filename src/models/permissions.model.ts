import mongoose, {Schema} from "mongoose";

export interface IPermission {
    user: Schema.Types.ObjectId;
    permission: PermissionEnum;
}

export enum PermissionEnum{
    FULL_ACCESS='FULL_ACCESS', READ_ONLY='READ_ONLY', READ_WRITE='READ_WRITE'
}

//Create Schema Access
const PermissionsSchema = new mongoose.Schema<IPermission>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    permission: {
        type: String,
        required: true,
        enum: ['FULL_ACCESS', 'READ_ONLY','READ_WRITE']
    },
}, {
    timestamps: true,
    versionKey: false
});

//Create model Access
export const Permission = mongoose.model<IPermission>("Permissions", PermissionsSchema);

