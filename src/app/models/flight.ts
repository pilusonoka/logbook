import { Pilot } from "./pilot";
import { Time } from "@angular/common";

export class Flight {
  crew: Pilot[];
  date: Date;
  start: Time;
  duration: Time;
  aircraft: string;
  departure: string;
  arrival: string;
  flight_rule: FlightRule;
  takeoffs: number;
  crosscountry: boolean;

  constructor(pilot: Pilot) {
    this.date = new Date();
    this.crew = [pilot];
    this.start = {hours: 12, minutes: 30};
    this.aircraft = pilot.aircrafts[0];
    this.flight_rule = 'VFR';
    this.takeoffs = 1
    this.crosscountry = false;
  }
}

export type FlightRule = 'VFR' | 'IFR';