import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";
import PublicPage from "../PublicPages";

const Content = lazy(() => importMDX("./Cgu.mdx"));

const Cgu = () => {
  return (
    <PublicPage>
      <Suspense fallback="...">
        <Content />
      </Suspense>
    </PublicPage>
  );
};

export default Cgu;
