import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";

const Content = lazy(() => importMDX("./LegalNotices.mdx"));

const LegalNotices = () => {
  return (
    <div className="page">
      <Suspense fallback="">
        <Content />
      </Suspense>
    </div>
  );
};

export default LegalNotices;
