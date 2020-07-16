import Auth from "../../services/Auth";

export const SetMatomo = config => {
  var _paq = window._paq || [];

  _paq.push(["setUserId", Auth.getUserId()]);
  _paq.push(["trackPageView"]);

  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.async = true;
  g.defer = true;
  g.src = config.url + "matomo.js";
  s.parentNode.insertBefore(g, s);
};
