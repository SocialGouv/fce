import utils from "../utils";

const document_association = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `documents_associations/${SIRET}`,
    params,
    async (out, data) => {
      if (data.documents && Array.isArray(data.documents)) {
        const documents = data.documents;
        const lastDocument = documents.reduce(
          (acc, curr) =>
            (curr.type === "Statuts" &&
              +curr.timestamp > +acc.timestamp &&
              curr) ||
            acc,
          { timestamp: 0 }
        );

        out.document_association = lastDocument;
      }
    }
  );
};

export default document_association;
