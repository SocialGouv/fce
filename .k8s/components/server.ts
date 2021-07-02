import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import {getGithubRegistryImagePath} from "../utils/getGithubRegistryImagePath";

const project = "fce";
const name = "server";

const manifests = create(name, {
  env,
  config: {
    containerPort: 3000,
    ingress: false
  },
  deployment: {
    image: getGithubRegistryImagePath(({ project, name })),
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
