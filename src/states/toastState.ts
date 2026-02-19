import { atom } from "recoil";
import { Toast } from "../models";

export const toastState = atom<Toast[]>({
  key: "toastState",
  default: [],
});
