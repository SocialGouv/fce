export default ({ value, empty, no = "Non", yes = "Oui" }) => {
  if (value && typeof value === "object") {
    return "error";
  }

  if (value === true && yes) {
    return yes;
  }

  if (value === false && no) {
    return no;
  }

  if (!value && empty) {
    return empty;
  }

  return typeof value !== "undefined" ? value : null;
};
