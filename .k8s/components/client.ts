import env from "@kosko/env";
import serverManifest from "./server"
import { ok } from "assert";

import { create } from "@socialgouv/kosko-charts/components/app";
import { EnvVar } from "kubernetes-models/v1";
import {addEnv, getIngressHost, getManifestByKind} from "@socialgouv/kosko-charts/utils";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

const tag = process.env.SHA;

const manifests = create("client", {
  env,
  config: {
    containerPort: 80,
  },
  deployment: {
    image: `ghcr.io/socialgouv/fabrique/fce-client:sha-${tag}`,
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

const serverUrl = new EnvVar({
  name: "SERVER_URL",
  value: `https://${getIngressHost(serverManifest)}/`,
});

//@ts-expect-error
const deployment = getManifestByKind(manifests, Deployment) as Deployment;

ok(deployment);

addEnv({
  //@ts-expect-error
  deployment,
  //@ts-expect-error
  data: serverUrl
});

export default manifests;
