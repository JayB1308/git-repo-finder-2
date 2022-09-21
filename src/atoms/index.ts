import { atom } from "recoil";

export const userProfileState = atom({
  key: "userProfileState",
  default: {},
});

export const LoadingState = atom({
  key: "LoadingState",
  default: false,
});

export const LoadingHeadingState = atom({
  key: "LoadingHeadingState",
  default: false,
});
