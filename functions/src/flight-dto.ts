import { Time } from "@angular/common";
import { Timestamp } from "@google-cloud/firestore";

export interface FlightDTO {
  pilotId: string;
  crew: any[];
  date: Timestamp;
  startTime: Time;
  duration: Time;
  aircraft: string;
  rule: FlightRule;
  takeoffs: number;
  crosscountry: boolean;
  departure: string;
  arrival: string;
}

export type FlightRule = 'VFR' | 'IFR';
export const flightRules = ['VFR', 'IFR'];