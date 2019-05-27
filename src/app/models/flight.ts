import { Pilot } from "./pilot";
import { Time } from "@angular/common";

export class Flight {
  pilotId: string;
  crew: string[];
  date: Date;
  startTime: Time;
  duration: Time;
  aircraft: string;
  departure: string;
  arrival: string;
  rule: FlightRule;
  takeoffs: number;
  crosscountry: boolean;

  constructor(pilot: Pilot) {
    this.pilotId = pilot.uid;
    this.date = new Date();
    this.crew = [pilot.uid];
    this.startTime = {hours: 12, minutes: 30};
    this.duration = {hours: 0, minutes: 0};
    this.aircraft = pilot.aircrafts[0];
    this.rule = 'VFR';
    this.takeoffs = 1;
    this.crosscountry = false;
  }
}

export type FlightRule = 'VFR' | 'IFR';
export const flightRules = ['VFR', 'IFR'];