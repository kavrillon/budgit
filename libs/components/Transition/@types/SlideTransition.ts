import { Transition } from './Transition';

export type SlideTransition = Transition & {
  inverse: boolean | null;
  vertical: boolean | null;
};
