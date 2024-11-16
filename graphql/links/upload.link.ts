//@ts-ignore
import createUploadLink from "apollo-upload-client/createUploadLink";

const uri = "http://localhost:4000/graphql";

export const uploadLink = createUploadLink({
  uri,
  isExtractableFile,
});

function isExtractableFile(value: unknown): value is ReactNativeFile {
  return value instanceof ReactNativeFile;
}

export class ReactNativeFile {
  uri: string;
  name: string;
  type: string;
  constructor({
    uri,
    name,
    type,
  }: {
    uri: string;
    name: string;
    type: string;
  }) {
    this.uri = uri;
    this.name = name;
    this.type = type;
  }
}