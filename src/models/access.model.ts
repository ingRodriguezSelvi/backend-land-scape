import mongoose, {Schema} from "mongoose";

export interface IAccess {
    user: Schema.Types.ObjectId;
}

//Create Schema Access
const AccessSchema = new mongoose.Schema<IAccess>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

//Create model Access
export const Access = mongoose.model<IAccess>("Access", AccessSchema);

