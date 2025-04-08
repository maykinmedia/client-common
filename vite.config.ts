import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import packageJson from "./package.json";

// Get the base name from package.json
const name = packageJson.name.split("/").pop();

// Function to get all subdirectories in the lib folder
const getSubLibraries = (dir: string) => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

const subLibraries = getSubLibraries(path.resolve(__dirname, "src"));

// Create an object of entry points where each sub-library has its own entry file
const entryPoints = subLibraries.reduce<Record<string, string>>(
  (acc, subLib) => {
    acc[subLib] = path.resolve(__dirname, "src", subLib, `${subLib}.ts`);
    return acc;
  },
  { index: path.resolve(__dirname, "src", "index.ts") },
);

export default defineConfig({
  build: {
    lib: {
      // Multiple entry points for each sub-library
      entry: entryPoints,
      name: name,
      fileName: (format, entryName) => {
        // This will create subdirectories in dist for each sub-library
        return `${format}/${entryName}.js`;
      },
    },
  },
  plugins: [
    dts({
      entryRoot: "src",
      outDir: "dist/types",
    }),
  ],
});
