import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { getManifestByKind } from "@socialgouv/kosko-charts/utils";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1/Ingress";
import { getGithubRegistryImagePath } from "../utils/getGithubRegistryImagePath";

const project = "fce";
const name = "client";

const createManifests = async () => {
  const manifests = await create(name, {
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
  });

  return manifests;
}

export default createManifests;
