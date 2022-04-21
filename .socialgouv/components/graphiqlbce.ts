import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { getGithubRegistryImagePath } from "../utils/getGithubRegistryImagePath";

const project = "fce";
const name = "graphiql";

export default () => create(name, {
  env,
  config: {
    containerPort: 80,
    subDomainPrefix: "graphiql-"
  },
  deployment: {
    image: getGithubRegistryImagePath({ name, project }),
  },
});
