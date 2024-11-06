import { ApolloLink } from "@apollo/client";
import { websocketLink } from "./websocket.link";
import { getMainDefinition } from "@apollo/client/utilities";
import { uploadLink } from "./upload.link";

export const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  websocketLink,
  uploadLink
);
