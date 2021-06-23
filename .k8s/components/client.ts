import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";

const tag = process.env.SHA;

const manifests = create("client", {
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
