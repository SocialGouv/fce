import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getGithubRegistryImagePath } from "../utils/getGithubRegistryImagePath";
import { Probe } from "kubernetes-models/v1";
// import {Probe, Volume, VolumeMount} from "kubernetes-models/v1";
// import {azureProjectVolume} from "@socialgouv/kosko-charts/components/azure-storage/azureProjectVolume";

const project = "fce";
const name = "n8n";

// const downloadsVolume = new Volume({
//   name: "downloads",
// });

// const downloadsVolumeMount = new VolumeMount({
//   name: "downloads",
//   mountPath: "/tmp/download"
// });

// const [persistentVolumeClaim, persistentVolume] = azureProjectVolume("n8n-db", {
//   storage: "1Gi"
// });

// const dbVolume = new Volume({
//   name: "n8n-db",
//   persistentVolumeClaim: { claimName: persistentVolumeClaim.metadata!.name! },
// });

// const dbVolumeMount = new VolumeMount({
//   mountPath: "/home/node/.n8n",
//   name: "n8n-db",
// });

const probe = new Probe({
  httpGet: {
    path: "/healthz",
    port: "http",
  },
  initialDelaySeconds: 60,
});

const createManifests = async () => {
  const manifests = await create(name, {
    env,
    config: {
      containerPort: 5678,
      subDomainPrefix: "n8n-",
    },
    deployment: {
      image: getGithubRegistryImagePath(({ project, name })),
      // volumes: [downloadsVolume, dbVolume],
      volumes: [{
        name: "downloads",
        azureFile: {
          readOnly: false,
          secretName: "azure-fce-volume",
          shareName: "downloads",
        },
      }, {
        name: "n8n-db",
        azureFile: {
          readOnly: false,
          secretName: "azure-fce-volume",
          shareName: "n8n-db",
        }
      }],
      container: {
        livenessProbe: probe,
        readinessProbe: probe,
        startupProbe: probe,
        resources: {
          requests: {
            cpu: "50m",
            memory: "128Mi",
          },
          limits: {
            cpu: "500m",
            memory: "1280Mi",
          },
        },
        volumeMounts: [{
          mountPath: "/tmp/download",
          name: "downloads",
        }, {
          mountPath: "/home/node/.n8n",
          name: "n8n-db",
        }]
      },
    },
  });

  return [...manifests];
}

export default createManifests;
