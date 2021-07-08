import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getGithubRegistryImagePath } from "../utils/getGithubRegistryImagePath";
import { Probe } from "kubernetes-models/v1";
import {getManifestByKind} from "@socialgouv/kosko-charts/utils";
import {Ingress} from "kubernetes-models/networking.k8s.io/v1/Ingress";

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


//@ts-expect-error
const ingress = getManifestByKind(manifests, Ingress) as Ingress;

ingress.spec?.rules?.forEach(rule => {
  if (process.env.SOCIALGOUV_PRODUCTION === "true") {
    rule.host = `new-${rule.host}`
  }
});

ingress.spec?.tls?.forEach((tls => {
  if (process.env.SOCIALGOUV_PRODUCTION === "true") {
    tls.hosts = tls.hosts?.map((host) => `new-${host}`)
  }
}))

export default manifests;
