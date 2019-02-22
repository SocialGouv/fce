import Config from "../../Config";

export default (establishment, interactionsTerms = null) => {
  let interactions = {};
  let totalInteractions = {
    total: 0
  };

  Config.get("interactions").forEach(pole => {
    try {
      const interactionsPole = establishment[`interactions_${pole}`] || [];
      interactions[pole] = interactionsPole;
      totalInteractions[pole] = interactionsPole.length;

      if (!interactionsTerms || interactionsTerms.includes(pole)) {
        totalInteractions.total += interactionsPole.length;
      }
    } catch (e) {
      console.error(e);
      interactions[pole] = [];
      totalInteractions[pole] = 0;
    }
  });

  establishment.interactions = interactions;
  establishment.totalInteractions = totalInteractions;

  return establishment;
};
