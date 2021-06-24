import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";

const tag = process.env.SHA;

const manifests = create("server", {
  env,
  config: {
    containerPort: 3000,
    ingress: false
  },
  deployment: {
    image: `ghcr.io/socialgouv/fabrique/fce-server:sha-${tag}`,
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
