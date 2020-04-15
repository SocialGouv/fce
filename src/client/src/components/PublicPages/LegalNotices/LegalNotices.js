import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";
import PublicPage from "../PublicPages";

const Content = lazy(() => importMDX("./LegalNotices.mdx"));

const LegalNotices = () => {
  return (
    <PublicPage>
      <Suspense fallback="...">
        <Content />
      </Suspense>
    </PublicPage>
  );
};

export default LegalNotices;
