import { Injectable } from '@angular/core';
import { Pilot } from './models/pilot';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  
  pilot: Pilot = {
    aircrafts: ['BEBE'],
    name: 'Karina Zarzecka'
  };
  constructor() { }
}
