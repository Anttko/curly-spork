/*
Small timer function, takes parameters interval and how long to be run if not reseted
*/
import { downloadDroneData } from "../lib/downloadDroneData";
let intervalId: any = null

export const startTimerfn = (updateInterval: number, runLenght: number): any => {
    clearInterval(intervalId)
    intervalId = setInterval(async () => { 
        console.log("running interval")
        return downloadDroneData() }
        , updateInterval)
    setTimeout(() => { clearInterval(intervalId) }, runLenght)
}

