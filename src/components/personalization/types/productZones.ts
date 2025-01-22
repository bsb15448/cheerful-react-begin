export interface CustomizationZone {
  width: number;
  height: number;
  top: number;
  left: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
}

export interface ProductZoneConfig {
  id: string;
  name: string;
  zone: CustomizationZone;
}