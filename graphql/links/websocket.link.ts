import { StorageService } from "@/services/storage.service";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export const websocketLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: async () => {
      const token = await StorageService.getItemString("TOKEN_AUTH");
      const includesBearer = token?.startsWith("Bearer");
      return {
        headers: {
          Authorization: includesBearer ? token : `Bearer ${token}`,
        },
        Authorization: includesBearer ? token : `Bearer ${token}`,
      };
    },
  })
);
