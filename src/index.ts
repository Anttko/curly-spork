import express from "express";
import cors from "cors";
import { info } from "./utils/logger";
import { MONGODB_URI, PORT } from "./utils/config";
import mongoose from "mongoose";
import { downloadDroneData } from "./lib/downloadDroneData";
import droneRouter from "./controllers/droneRouter";

const app = express();
app.use(express.json());
app.use(cors());


info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        info('connected to MongoDB')
    })
    .catch((error) => {
        info('error connection to MongoDB:', error.message)
    })

app.get("/healthcheck", (_req, res) => {
    downloadDroneData()
    console.log("someone pinged here");
    res.send("pong");
});
app.use('/api/drones', droneRouter)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});