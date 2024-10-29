import { SlicePattern } from 'zustand';

export const createUserSlice: SlicePattern<UserInfoState> = (set) => ({
  setUser: (user) =>
    set(
      (state) => {
        return {
          user,
        };
      },
      false,
      { type: 'initialize/user' },
    ),
});
