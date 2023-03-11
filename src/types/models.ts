export type IEquals = {
  '*': (a: number, b: number) => number;
  '+': (a: number, b: number) => number;
  '-': (a: number, b: number) => number;
  '/': (a: number, b: number) => number;
};

export type IDragOrder = {
  id: string;
  name: string;
};
