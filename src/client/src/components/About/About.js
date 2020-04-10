import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";
import UsersFeedback from "../../containers/UsersFeedback";

const Content = lazy(() => importMDX("./About.mdx"));

const About = () => {
  return (
    <>
      <div className="page">
        <Suspense fallback="">
          <Content />
        </Suspense>
      </div>
      <UsersFeedback fullWidth />
    </>
  );
};

export default About;
