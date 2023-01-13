
import express from "express";
const router = express.Router();
import { Drones } from "../models/drones";
import { startTimerfn } from "../lib/timerFunc";


// when route is called, starts and resets interval
router.get("/", async (_request, response) => {
    startTimerfn(2000, 900000)
    const droneData = await Drones.find({});
    response.json(droneData);
})

// get without triggering interval
router.get("/get", async (_request, response) => {
    const droneData = await Drones.find({});
    response.json(droneData);
})


export default router;