export const getSuccession = (successeur, predecesseur) => {
  if (successeur !== null) {
    return successeur;
  }
  return predecesseur || null;
};
