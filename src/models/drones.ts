import mongoose from "mongoose";
import { DroneViolator } from "../types";

// data to be removed after 10 minutes
interface iDrone extends DroneViolator {
    expiresAt?: Date;
}

const schema = new mongoose.Schema<iDrone>({
    serialNumber: { type: String, required: true, unique: true },
    timestamp: { type: String, required: true },
    distance: { type: Number, required: true },
    positionX: { type: Number, required: true },
    positionY: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    expiresAt: { type: Date, expires: '10m', default: Date.now() }
});

schema.set("toJSON", {
    transform: (_document: any, returnedObject): void => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
export const Drones = mongoose.model<iDrone>("Drones", schema);