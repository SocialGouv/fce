export type WikitUc = {
  CODE_UC: string;
  LIB_UC: string;
  "Courrier électronique": string;
}

export const findWikitUcByCode = (wikitUc: WikitUc[], searchedCode: string) =>
    wikitUc.find(({ CODE_UC }) => CODE_UC === searchedCode);
