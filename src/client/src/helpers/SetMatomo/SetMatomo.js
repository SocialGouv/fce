export const SetMatomo = (config, userId) => {
  var _paq = window._paq || [];

  _paq.push(["setUserId", userId]);
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
