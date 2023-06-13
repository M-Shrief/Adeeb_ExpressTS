export interface VerseType {
  first: string;
  sec: string;
}

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
