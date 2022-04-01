import { PartialState, State } from 'zustand/vanilla';

declare module 'zustand' {
  export * from './node_modules/zustand/index';
  export declare type SetState<T extends State> = {
    <K1 extends keyof T, K2 extends keyof T = K1, K3 extends keyof T = K2, K4 extends keyof T = K3>(
      partial: PartialState<T, K1, K2, K3, K4>,
      replace?: boolean,
      actionName?: string
    ): void;
  };
}
