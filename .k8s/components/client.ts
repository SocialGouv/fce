import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import {getManifestByKind} from "@socialgouv/kosko-charts/utils";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1/Ingress";
import {getGithubRegistryImagePath} from "@socialgouv/kosko-charts/utils/getGithubRegistryImagePath";

const project = "fce";
const name = "client";

const manifests = create(name, {
  env,
  config: {
    containerPort: 80,
  },
  deployment: {
    image: getGithubRegistryImagePath({ name, project }),
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

//@ts-expect-error
const ingress = getManifestByKind(manifests, Ingress) as Ingress;

//@ts-expect-error
ingress.spec?.rules[0].http.paths.push({
  path: "/api",
  pathType: "Prefix",
  backend: {
    //@ts-expect-error
    serviceName: "server",
    servicePort: 80,
  }
})

ingress.spec?.rules?.forEach(rule => {
  if (process.env.IS_PROD === "true") {
    rule.host = `new-${rule.host}`
  }
});

ingress.spec?.tls?.forEach((tls => {
  if (process.env.IS_PROD === "true") {
    tls.hosts = tls.hosts?.map((host) => `new-${host}`)
  }
}))

export default manifests;
