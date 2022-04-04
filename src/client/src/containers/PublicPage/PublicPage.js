import React from "react";
import { useLocation } from "react-router-dom";

import PublicPageDefault from "../../components/PublicPage";
import Faq from "../../components/PublicPage/Faq";
import Help from "../../components/PublicPage/Help";
import { useStrapiData } from "../../helpers/hooks/useStrapiData";
import Config from "../../services/Config";

const components = new Map([
  ["/faq", Faq],
  ["/aide", Help],
]);

const PublicPage = () => {
  const location = useLocation();

  const ViewComponent = components.get(location.pathname) || PublicPageDefault;

  const path =
    location.pathname in Config.get("strapi.path")
      ? Config.get(`strapi.path.${location.pathname}`)
      : location.pathname;

  const state = useStrapiData(path);

  return (
    <ViewComponent
      pageData={state.pageData}
      isLoading={state.isLoading}
      hasError={state.hasError}
    />
  );
};

export default PublicPage;
