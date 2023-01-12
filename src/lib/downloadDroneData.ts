import axios from "axios"
import { XMLParser } from "fast-xml-parser";
import { Device } from '../types';
import { getPilotData } from "./downloadPilotData";
import { circleValues } from './values'
import { Drones } from '../models/drones'
const readData = async (drones: Device[], timestamp: string) => {
    drones.map(async (drone) => {
        const check: number = calcDistance(drone.positionX, drone.positionY)
        if (check <= circleValues.radius) {
            const pilotData = await getPilotData(drone.serialNumber)
            const violatedDrone = {
                serialNumber: drone.serialNumber,
                timestamp: timestamp,
                distance: check / 1000, //  convert to meters
                positionX: drone.positionX,
                positionY: drone.positionY,
                ...pilotData
            }
            const newDrone = new Drones(violatedDrone)
            await newDrone.save()
        }
    })
}

const calcDistance = (posX: number, posY: number): number => {
    return Math.sqrt(Math.pow((posX - circleValues.x), 2) + Math.pow((posY - circleValues.y), 2))
}



// Reads data from api for 15 minutes before stopping for every 1.5 seconds
export const downloadDroneData = async () => {
    let intervalId = setInterval(async () => {
        try {
            const drones: any = await axios.get('http://assignments.reaktor.com/birdnest/drones', {
                headers: { 'Accept': 'application/xml' }
            })
            const dronesValue = drones.data
            const options = {
                ignoreAttributes: false
            }
            const parser = new XMLParser(options)
            let json = parser.parse(dronesValue)
            const timestamp = json.report.capture['@_snapshotTimestamp']
            readData(json.report.capture.drone, timestamp)
        } catch (error) {
            console.log(error)
        }
    }, 2000)
    setTimeout(() => { clearInterval(intervalId) }, 900000)
}