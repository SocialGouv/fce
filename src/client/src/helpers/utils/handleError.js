import { captureException as sentryCaptureException } from "@sentry/browser";

import Config from "../../services/Config";

export const handleError = (e) => {
  if (Config.get("sentryUrl")) {
    sentryCaptureException(e);
  } else {
    console.error(e);
  }
};
