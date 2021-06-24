import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import {getManifestByKind} from "@socialgouv/kosko-charts/utils";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1/Ingress";

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

//@ts-expect-error
const ingress = getManifestByKind(manifests, Ingress) as Ingress;

//@ts-expect-error
ingress.spec?.rules[0].http.paths.push({
  path: "/api",
  pathType: "Prefix",
  backend: {
    service: {
      //@ts-expect-error
      serviceName: "server",
      servicePort: 80,
    }
  }
})

export default manifests;
