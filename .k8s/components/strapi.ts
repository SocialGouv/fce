import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getGithubRegistryImagePath } from "../utils/getGithubRegistryImagePath";
import { Probe } from "kubernetes-models/v1";

const project = "fce";
const name = "strapi";

const probe = new Probe({
  httpGet: {
    path: "/_health",
    port: "http",
  },
  initialDelaySeconds: 30,
});

const manifests = create(name, {
  env,
  config: {
    containerPort: 1337,
    ingress: false
  },
  deployment: {
    image: getGithubRegistryImagePath(({ project, name })),
    container: {
      livenessProbe: probe,
      readinessProbe: probe,
      startupProbe: probe,
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
