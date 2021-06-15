import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";

const tag = process.env.CI_COMMIT_TAG
  ? process.env.CI_COMMIT_TAG.slice(1)
  : process.env.CI_COMMIT_SHA;

const manifests = create("app", {
  env,
  config: {
    containerPort: 80,
  },
  deployment: {
    image: `ghcr.io/socialgouv/fce/client:sha-${tag}`,
    container: {
      resources: {
        requests: {
          cpu: "100m",
          memory: "128Mi",
        },
        limits: {
          cpu: "500m",
          memory: "1280Mi",
        },
      },
    },
  },
});

export default manifests;
