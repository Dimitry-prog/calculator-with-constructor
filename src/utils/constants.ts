import { IDragOrder } from '../types/models';

export const calcAction: string[] = ['/', 'x', '-', '+'];
export const calcNumAndComma: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];
export const dragOrder: IDragOrder[] = [
  {
    id: '0',
    name: 'output',
  },
  {
    id: '1',
    name: 'actions',
  },
  {
    id: '2',
    name: 'numbers',
  },
  {
    id: '3',
    name: 'equal',
  },
];
