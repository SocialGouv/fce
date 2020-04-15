import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";
import PublicPage from "../PublicPages";

const Content = lazy(() => importMDX("./About.mdx"));

const About = () => {
  return (
    <PublicPage>
      <Suspense fallback="...">
        <Content />
      </Suspense>
    </PublicPage>
  );
};

export default About;
