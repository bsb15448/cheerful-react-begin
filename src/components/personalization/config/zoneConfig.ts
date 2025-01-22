import { ProductZoneConfig } from "../types/productZones";

export const productZoneConfigs: ProductZoneConfig[] = [
  {
    id: 'mugs',
    name: 'Tasses',
    zone: {
      width: 200,
      height: 150,
      top: 100,
      left: 150,
      backgroundColor: '#F6F6F7',
      borderColor: '#8E9196',
      borderWidth: 2,
      borderStyle: 'dashed'
    }
  },
  {
    id: 'tshirts',
    name: 'T-shirts',
    zone: {
      width: 250,
      height: 300,
      top: 150,
      left: 175,
      backgroundColor: '#F1F0FB',
      borderColor: '#9b87f5',
      borderWidth: 2,
      borderStyle: 'dashed'
    }
  },
  {
    id: 'blouses',
    name: 'Blouses de travail',
    zone: {
      width: 250,
      height: 300,
      top: 150,
      left: 175,
      backgroundColor: '#F2FCE2',
      borderColor: '#8E9196',
      borderWidth: 2,
      borderStyle: 'dashed'
    }
  },
  {
    id: 'flyers',
    name: 'Flyers',
    zone: {
      width: 400,
      height: 500,
      top: 50,
      left: 50,
      backgroundColor: '#FEF7CD',
      borderColor: '#8E9196',
      borderWidth: 2,
      borderStyle: 'dashed'
    }
  },
  {
    id: 'notebooks',
    name: 'Carnets',
    zone: {
      width: 300,
      height: 400,
      top: 100,
      left: 100,
      backgroundColor: '#FFDEE2',
      borderColor: '#8E9196',
      borderWidth: 2,
      borderStyle: 'dashed'
    }
  },
  {
    id: 'bags',
    name: 'Sacs',
    zone: {
      width: 300,
      height: 250,
      top: 150,
      left: 150,
      backgroundColor: '#D3E4FD',
      borderColor: '#8E9196',
      borderWidth: 2,
      borderStyle: 'dashed'
    }
  }
];