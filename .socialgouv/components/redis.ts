import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/redis";

const manifests = create("redis", {
  env,
  deployment: {
    container: {
      resources: {
        requests: {
          cpu: "5m",
          memory: "128Mi",
        },
        limits: {
          cpu: "1000m",
          memory: "1Gi",
        },
      },
    },
  },
});

export default manifests;
