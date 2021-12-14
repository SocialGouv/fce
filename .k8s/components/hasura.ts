import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getGithubRegistryImagePath } from "../utils/getGithubRegistryImagePath";

const project = "fce";
const name = "hasura";

const createManifests = async () => {
  const manifests = await create(name, {
    env,
    config: {
      containerPort: 80,
      subDomainPrefix: "hasura-",
      ingress: false,
    },
    deployment: {
      image: getGithubRegistryImagePath(({ project, name })),
      container: {
        resources: {
          requests: {
            cpu: "50m",
            memory: "128Mi",
          },
          limits: {
            cpu: "500m",
            memory: "1280Mi",
          },
        }
      }
    },
  });

  return manifests;
}

export default createManifests;
