import React from "react";
import InfoBox from "../InfoBox";
import Tooltip from "../Tooltip/Tooltip";
import TooltipContent from "../TooltipContent/TooltipContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/pro-solid-svg-icons";

const nonDiffusableTooltip = () => (
  <TooltipContent>
    Il s’agit des établissements et unités légales de personnes physiques qui ont fait valoir leur droit à ne pas faire partie de la diffusion dans les fichiers de l'Insee, conformément à l'article A123-96 du code de commerce. Les informations les concernant ne peuvent alors être rediffusées, ni utilisées à des fins de prospection.
  </TooltipContent>
);

const NonDiffusableBadge = () => (
  <Tooltip
    overlay={nonDiffusableTooltip}
  >
    <InfoBox type="warning">
      <span>Entreprise non-diffusible <FontAwesomeIcon icon={faQuestionCircle} /></span>
    </InfoBox>
  </Tooltip>
);


export default NonDiffusableBadge;
