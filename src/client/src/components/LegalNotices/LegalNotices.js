import React, { lazy, Suspense } from "react";
import { importMDX } from "mdx.macro";
import UsersFeedback from "../../containers/UsersFeedback";

const Content = lazy(() => importMDX("./LegalNotices.mdx"));

const LegalNotices = () => {
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

export default LegalNotices;
