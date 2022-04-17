import { atom } from "recoil";
import data from "./API.json";

const datas = data.renderings;

export const dataAtom = atom({
  key: "datas",
  default: datas,
});

export const isDetailedAtom = atom({
  key: "isChosen",
  default: false,
});

export const chosenImgAtom = atom({
  key: "chosenUrl",
  default: {
    url: "",
    index: 0,
  },
});
