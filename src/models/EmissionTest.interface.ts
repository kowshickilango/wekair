import { Vehicle } from './Vehicle';

export interface EmissionTest {
  catalyticConverter: boolean;

  CO2: number;

  O2: boolean;

  airFilter: boolean;

  otherIssue: boolean;

  vehicle: Vehicle;

  createdAt: string;
}
