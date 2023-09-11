import { ProseType } from "./prose.interface";
import { ChosenVerseType } from "./chosenVerse.interface";

export interface VerseType {
  first: string;
  sec: string;
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface Poetry extends ChosenVerseType, ProseType {};
export type PoetryType = PartialBy<Poetry, 'qoute' | 'verses'>
export interface Print {
  _id?: string;
  poem?: string;
  verses?: VerseType[];
  qoute?: string;
}

export interface Product {
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
export interface ProductGroup {
  prints: Print[];
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
