import { CodegenConfig } from "@graphql-codegen/cli";

const codegen: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: [
    "graphql/queries/*.query.graphql",
    "graphql/mutations/*.mutation.graphql",
    "components/**/*.component.tsx",
    "app/**/*.tsx",
  ],
  generates: {
    "./graphql/__generated__/": {
      preset: "client",
      plugins: [
        "fragment-matcher",
        // "graphql-code-generator-plugin-typescript-typename-typeguards",
      ],
      /*presetConfig: {
        fragmentMasking: false,
      },*/
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default codegen;
