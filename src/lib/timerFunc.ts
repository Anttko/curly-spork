/*
Small timer function, takes parameters interval and how long to be run if not reseted
*/
import { downloadDroneData } from "../lib/downloadDroneData";
let intervalId: any

export const startTimerfn = (updateInterval: number, runLenght: number): any => {
    clearInterval(intervalId)
    intervalId = setInterval(async () => { 
        return downloadDroneData() }
        , updateInterval)
    setTimeout(() => { clearInterval(intervalId) }, runLenght)
}

