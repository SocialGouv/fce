import React from "react";
import { faPrint } from "@fortawesome/pro-solid-svg-icons";
import Button from "../../../../shared/Button";

const PrintSection = () => {
  return (
    <div className="data-sheet__print-section">
      <Button
        value="Imprimer"
        buttonClasses={["is-grey"]}
        icon={faPrint}
        callback={() => window.print()}
      />
    </div>
  );
};

export default PrintSection;
