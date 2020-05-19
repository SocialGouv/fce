import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";
import PublicPage from "../PublicPages";

const Content = lazy(() => importMDX("./DataSource.mdx"));

const DataSource = () => {
  return (
    <PublicPage>
      <Suspense fallback="...">
        <Content />
      </Suspense>
    </PublicPage>
  );
};

export default DataSource;
