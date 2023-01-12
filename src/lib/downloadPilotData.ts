import axios from "axios"
import { Pilot } from "../types"

export const getPilotData = async (pilotId: string) => {
    try {
        const response = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${pilotId}`)
        const pilotData: Pilot = response.data
        return pilotData
    } catch (error) {
        console.log(error)
        return {}
    }

}