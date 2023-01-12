export interface Device {
    serialNumber: string,
    model: string,
    manufacturer: string,
    mac: string,
    ipv4: string,
    ipv6: string,
    firmware: string,
    positionY: number,
    positionX: number,
    altitude: number
}

export interface droneData {
    serialNumber: string,
    timestamp: string,
    distance: number,
    positionX: number,
    positionY: number,
}

export interface Pilot {
    pilotId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    createdDt: string,
    email: string,
}
export interface DroneViolator extends droneData {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
}