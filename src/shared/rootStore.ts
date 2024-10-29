import { createUserSlice } from '@/shared/user';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createCounterSlice } from './counter';

export const useStore = create<BoundState>()(
  devtools(
    immer((...a) => ({
      ...createCounterSlice(...a),
      ...createUserSlice(...a),
    })),
    {
      name: 'bobworks-store',
      enabled: process.env.NODE_ENV !== 'production',
    },
  ),
);

export type BoundState = CounterState & UserInfoState;
