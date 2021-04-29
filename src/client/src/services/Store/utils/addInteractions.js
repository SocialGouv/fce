import Config from "../../Config";

export default entity => {
  let interactions = [];
  let totalInteractions = {
    total: 0
  };

  Config.get("interactions.poles").forEach(pole => {
    try {
      const interactionsPole = entity[`interactions_${pole}`] || [];
      interactions = [...interactions, ...interactionsPole];
      totalInteractions[pole] = interactionsPole.length;
      totalInteractions.total += interactionsPole.length;
    } catch (e) {
      console.error(e);
      interactions[pole] = [];
      totalInteractions[pole] = 0;
    }
  });

  entity.interactions = interactions.sort(
    (interaction1, interaction2) =>
      new Date(interaction2.date) - new Date(interaction1.date)
  );

  entity.totalInteractions = totalInteractions;

  return entity;
};
