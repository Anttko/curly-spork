
import express from "express";
const router = express.Router();
import { Drones } from "../models/drones";
//import { downloadDroneData } from "../lib/downloadDroneData";

router.get("/", async (_request, response) => {
    //downloadDroneData();
    const droneData = await Drones.find({});
    response.json(droneData);
})

export default router;