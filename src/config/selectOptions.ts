export const vehicleTypes = ['two-wheeler', 'light-vehicle', 'dual-purpose'] as const;

export type VehicleTypes = (typeof vehicleTypes)[number];
