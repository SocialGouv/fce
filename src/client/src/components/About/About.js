import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";

const Content = lazy(() => importMDX("./About.mdx"));

const About = () => {
  return (
    <div className="page">
      <Suspense fallback="">
        <Content />
      </Suspense>
    </div>
  );
};

export default About;
