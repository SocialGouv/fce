export type WikitUc = {
  code: string;
  libelle: string;
  email: string;
}

export const findWikitUcByCode = (wikitUc: WikitUc[], searchedCode: string) =>
    wikitUc.find(({ code }) => code === searchedCode);
