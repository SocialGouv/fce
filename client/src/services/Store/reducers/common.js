import {
  SET_COMMON_NAF,
  SET_COMMON_COMMUNES,
  SET_COMMON_CODEPOSTAUX,
  SET_COMMON_DEPARTEMENTS
} from "../constants/ActionTypes";

const initialState = {
  naf: ["1234A", "1234B", "7894C", "5555Z"],
  communes: [
    "Toulouse",
    "Calmont",
    "Albi",
    "Pamiers",
    "Cahors",
    "Auch",
    "Agen"
  ],
  codePostaux: ["31000", "31560", "31100", "31200", "12000", "32000", "09000"],
  departements: ["31", "32", "09", "12"]
};

const common = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMON_NAF:
      return {
        ...state,
        naf: action.naf
      };
    case SET_COMMON_COMMUNES:
      return {
        ...state,
        communes: action.communes
      };
    case SET_COMMON_CODEPOSTAUX:
      return {
        ...state,
        codePostaux: action.codePostaux
      };
    case SET_COMMON_DEPARTEMENTS:
      return {
        ...state,
        departements: action.departements
      };
    default:
      return state;
  }
};

export default common;
