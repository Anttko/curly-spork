
import express from "express";
const router = express.Router();
import { Drones } from "../models/drones";
import { startTimerfn } from "../lib/timerFunc";


// when route is called, starts and resets interval
router.get("/", async (_request, response) => {
    startTimerfn(2000, 900000)
    try {
        const droneData = await Drones.find({});
        response.json(droneData);
    }
    catch (error) {
        console.log(error)
        response.json({ error })
    }

})

// get without triggering interval
router.get("/get", async (_request, response) => {
    try {
        const droneData = await Drones.find({});
        response.json(droneData);
    }
    catch (error) {
        console.log(error)
        response.json({ error })
    }
})


export default router;