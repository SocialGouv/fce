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

const createManifests = async () => {
  const manifests = await create(name, {
    env,
    config: {
      containerPort: 1337,
      subDomainPrefix: "strapi-",
    },
    deployment: {
      image: getGithubRegistryImagePath(({ project, name })),
      container: {
        livenessProbe: probe,
        readinessProbe: probe,
        startupProbe: probe,
        resources: {
          requests: {
            cpu: "5m",
            memory: "16Mi",
          },
          limits: {
            cpu: "500m",
            memory: "512Mi",
          },
        },
      },
    },
  });

  return manifests;
}

export default createManifests;
