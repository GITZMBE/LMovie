import { atom } from "nanostores";
import { Toast } from "../models";

export const toastState = atom<Toast[]>([]);
