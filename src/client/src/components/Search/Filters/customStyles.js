export const selectCustomStyles = {
  container: (styles) => ({
    ...styles,
    "&:focus,&:active,&:focus-within": {
      outline: "5px solid #0a76f6 !important",
      outlineOffset: "2px !important",
      outlineWidth: "2px !important",
    },
    backgroundColor: "#EEEEEE",
    border: "none",
    borderBottom: "2px solid black",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    boxShadow: "none",
    cursor: "pointer",
    fontFamily: "Marianne, sans-serif",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.5rem",
    minHeight: "2.5rem",
  }),
  control: (styles) => ({
    ...styles,

    backgroundColor: "#EEEEEE",
    border: "none",
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
    boxShadow: "none",
    cursor: "pointer",
    fontFamily: "Marianne, sans-serif",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "1.5rem",
    minHeight: "2.5rem",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#161616",
  }),

  menuPortal: (base) => ({
    ...base,
    paddingTop: "5px",

    zIndex: 9999,
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: data.isFixed ? "gray" : "#dfdff1", // Si c'est fixé, fond gris sinon une autre couleur
      borderRadius: "6px",
    };
  },

  multiValueLabel: (styles) => ({
    ...styles,
    color: "#000091",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    ":hover": {
      backgroundColor: "#000091",
      color: "white",
    },
    color: "#000091",
    display: data.isFixed ? "none" : "flex",
  }),
  option: (provided) => ({
    ...provided,
    color: "#353535",
  }),

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#161616",
      fontFamily: "Marianne, sans-serif",
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "1.5rem",
    };
  },
};
