export default ({ value, empty, no }) => {
  if (value && typeof value === "object") {
    return "error";
  }

  if (value === false && no) {
    return no;
  }

  if (!value && empty) {
    return empty;
  }

  return typeof value !== "undefined" ? value : null;
};
