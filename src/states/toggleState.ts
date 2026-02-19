import { atom } from "recoil";

export const openMenuState = atom({
  key: "openMenu",
  default: false,
});

export const openSearchState = atom({
  key: "openSearch",
  default: false,
});
