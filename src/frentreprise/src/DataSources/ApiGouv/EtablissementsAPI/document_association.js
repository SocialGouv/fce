import utils from "../../../Utils/utils";
import DocumentAssociationsCacheModel from "../../../Models/DocumentAssociationsCache";

const document_association = async (SIRET, Axios, params, db) => {
  const DocumentAssociationsCache = new DocumentAssociationsCacheModel(db);

  try {
    const documentAssociationCache = await DocumentAssociationsCache.getBySiret(
      SIRET
    );

    if (documentAssociationCache) {
      return {
        document_association: JSON.parse(documentAssociationCache.value)
      };
    }
  } catch (error) {
    console.error(error);
  }

  return await utils
    .requestAPI(Axios, `documents_associations/${SIRET}`, params)
    .then(data => {
      if (
        data.documents &&
        Array.isArray(data.documents) &&
        data.documents.length
      ) {
        const documents = data.documents;
        const lastDocument = documents.reduce(
          (acc, curr) =>
            (curr.type === "Statuts" &&
              +curr.timestamp > +acc.timestamp &&
              curr) ||
            acc,
          { timestamp: 0 }
        );

        return { document_association: lastDocument };
      }
    });
};

export default document_association;
