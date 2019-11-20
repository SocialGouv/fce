import UAParser from "ua-parser-js";

export const getBrowserName = () => {
  const ua = new UAParser();
  return ua.getBrowser().name;
};

export const isIE = () =>
  ["IE", "Internet Explorer"].includes(getBrowserName());
