import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";
import {Probe, ResourceRequirements} from "kubernetes-models/v1";

const name = "pgadmin";

const isProd = () => process.env.SOCIALGOUV_PRODUCTION === "true";

const probe = new Probe({
  httpGet: {
    path: "/misc/ping",
    port: "http",
  },
  initialDelaySeconds: 60
});

const resources = new ResourceRequirements({
  requests: {
    memory: "256Mi",
  },
  limits: {
    memory: "512Mi"
  }
});

const createManifests = () => !isProd() ? create(name, {
    env,
    config: {
      subDomainPrefix: "pgadmin-",
      containerPort: 80,
    },
    deployment: {
      image: "dpage/pgadmin4",
      container: {
        livenessProbe: probe,
        readinessProbe: probe,
        startupProbe: probe,
        resources,
      },
    },
  }) : [];

export default createManifests;
