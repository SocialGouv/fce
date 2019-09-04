import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";

const Content = lazy(() => importMDX("./Cgu.mdx"));

const Cgu = () => {
  return (
    <div className="page">
      <Suspense fallback="">
        <Content />
      </Suspense>
    </div>
  );
};

export default Cgu;
