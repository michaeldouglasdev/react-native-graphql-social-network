import { ApolloClient, ApolloLink } from "@apollo/client";

import { AuthorizationLink } from "../links/authorization.link";
import { splitLink } from "../links/split.link";
import { initCache } from "./cache";

export const getApolloClient = async () => {
  const cache = await initCache();
  const apolloClient = new ApolloClient({
    cache,
    link: ApolloLink.from([AuthorizationLink, splitLink]),
  });

  return apolloClient;
};
