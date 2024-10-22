import { CodegenConfig } from "@graphql-codegen/cli";

const codegen: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: [
    "graphql/queries/*.query.graphql",
    "graphql/mutations/*.mutation.graphql",
    "components/**/*.component.tsx",
    "app/**/*.tsx",
    "app/*.tsx",
    "hooks/*.ts",
  ],
  generates: {
    "./graphql/__generated__/": {
      preset: "client",
      plugins: ["fragment-matcher"],
      config: {
        useExplicitTyping: true,
      },
      presetConfig: {
        fragmentMasking: true,
        persistedDocuments: true,
      },
    },
  },
};

export default codegen;
