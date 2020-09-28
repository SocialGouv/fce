import _clone from "lodash.clonedeep";
import addInteractions from "./addInteractions";

const ESTABLISHMENTS_KEY = "etablissements";
const MERGE_KEYS = ["_dataSources"];

export default (currentEntity, newData) => {
  if (newData.siren !== currentEntity.siren) {
    return postProcess(newData);
  }

  return postProcess(updateEntity(currentEntity, newData));
};

const updateEntity = (currentEntity, newData) => {
  const finalEntity = _clone(currentEntity);
  Object.entries(newData).forEach(([key, value]) => {
    if (finalEntity[key] === null || finalEntity[key] === undefined) {
      finalEntity[key] = value;
      return;
    }

    if (MERGE_KEYS.includes(key) && value) {
      finalEntity[key] = { ...finalEntity[key], ...value };
      return;
    }

    if (key === ESTABLISHMENTS_KEY) {
      finalEntity[key] = updateEstablishments(
        finalEntity[key] || [],
        newData[key]
      );
      return;
    }
  });

  return finalEntity;
};

const updateEstablishments = (currentEstablishments, newEstablishments) => {
  const finalEstablishments = _clone(currentEstablishments);

  newEstablishments.forEach(newEstablishmentData => {
    const indexToUpdate = currentEstablishments.findIndex(
      ({ siret }) => siret === newEstablishmentData.siret
    );
    const isExistInCurrent = indexToUpdate !== -1;

    if (!isExistInCurrent) {
      return finalEstablishments.push(newEstablishmentData);
    }

    finalEstablishments[indexToUpdate] = updateEntity(
      finalEstablishments[indexToUpdate],
      newEstablishmentData
    );
  });

  return finalEstablishments;
};

const postProcess = entity => {
  const finalEntity = addInteractions(entity);
  if (Array.isArray(finalEntity.etablissements)) {
    finalEntity.etablissements.forEach((establishment, index) => {
      finalEntity.etablissements[index] = addInteractions(establishment);
    });
  }
  return finalEntity;
};
