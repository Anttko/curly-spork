import axios from "axios"
import { XMLParser } from "fast-xml-parser";
import { Device } from '../types';
import { getPilotData } from "./downloadPilotData";
import { circleValues } from './values'
import { Drones } from '../models/drones'

/* 
Reads the drone list from external api and checks if drone already exists in database.
If drone does not exist, it calculates the distance between drone and circle center.
If distance (d) is less than or equal to circle radius(100meters), it calls getPilotData function to get pilot data.
After that it creates a new drone object and saves it to database.
*/

const readData = async (drones: Device[], timestamp: string) => {
    drones.map(async (drone) => {
        const checkIfDronesExists = await Drones.findOne({ serialNumber: drone.serialNumber })
        if (!checkIfDronesExists) {
            const check: number = calcDistance(drone.positionX, drone.positionY)
            if (check <= circleValues.radius) {
                try {
                    const pilotData = await getPilotData(drone.serialNumber)
                    const violatedDrone = {
                        serialNumber: drone.serialNumber,
                        timestamp: timestamp,
                        distance: check / 1000, //  convert to meters
                        positionX: drone.positionX,
                        positionY: drone.positionY,
                        expireAt: Date.now(),
                        ...pilotData
                    }
                    const newDrone = new Drones(violatedDrone)

                    await newDrone.save()
                } catch (error) {
                    console.log(error)
                }
            }
        }
    })
}

/* 
Distance formula:
d=√((x_2-x_1)²+(y_2-y_1)²)
calculate distance between drone and circle center
*/
const calcDistance = (posX: number, posY: number): number => {
    const d = Math.pow((posX - circleValues.x), 2) + Math.pow((posY - circleValues.y), 2)
    const distance = Math.sqrt(d)
    return distance
}

export const downloadDroneData = async () => {
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
}





