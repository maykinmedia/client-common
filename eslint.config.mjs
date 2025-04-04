import {ignoreBuildArtifacts} from "@maykinmedia/eslint-config";
import recommended from "@maykinmedia/eslint-config/recommended";

const config = [
  ignoreBuildArtifacts(["build", "storybook-static"]),
  ...recommended,
];

export default config;
