/*
Small timer function, takes parameters interval and how long to be run if not reseted
At the end database is cleared
*/
import { downloadDroneData } from "../lib/downloadDroneData";
import { Drones } from "../models/drones";


let intervalId: any
export const startTimerfn = (updateInterval: number, runLenght: number): any => {
    clearInterval(intervalId)
    intervalId = setInterval(async () => {
        return (
            downloadDroneData())
    }
        , updateInterval)
    setTimeout(() => {
        Drones.deleteMany({}).then(() => {
            console.log("database cleared")
        })
        clearInterval(intervalId)
    }, runLenght)
}

