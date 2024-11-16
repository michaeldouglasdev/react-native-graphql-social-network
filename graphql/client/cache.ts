import { InMemoryCache } from "@apollo/client";
import PossibleTypes from "@/graphql/__generated__/graphql";
import { MeQuery } from "@/hooks/me.query.hook";
import { StorageService } from "@/services/storage.service";

const cache = new InMemoryCache({
  possibleTypes: PossibleTypes.possibleTypes,
  typePolicies: {
    Query: {
      fields: {
        notifications: {
          keyArgs: false,
        },
        feed: {
          keyArgs: [
            "data",
            [
              "where",
              [
                "content",
                ["contains"],
                "authorId",
                ["equals"],
                "parentPostId",
                ["equals"],
              ],
            ],
          ],
        },
        conversation: (_, { args, toReference, ...data }) => {
          console.log("args", args, _, data);
          return toReference({
            __typename: "ConversationDirect",
            id: args?.id,
          });
        },
        conversations: {
          keyArgs: false,
        },
      },
    },
    ConversationDirect: {
      fields: {
        messages: {
          keyArgs: false,
          merge(existing = { edges: [] }, incoming, options) {
            /*
              const existingMessageIds = new Set(
                existing.edges.map((edge: any) => edge.node.id)
              );
              const uniqueIncomingEdges = incoming.edges.filter(
                (edge: any) => !existingMessageIds.has(edge.node.id)
              );
            */
            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            };
          },
        },
      },
    },
  },
});

export const initCache = async () => {
  const [token, me] = await Promise.all([
    StorageService.getItemString("TOKEN_AUTH"),
    StorageService.getItem<any>("ME"),
  ]);

  if (me) {
    cache.writeQuery({
      query: MeQuery,
      data: {
        me: me,
        __typename: "Query",
      },
    });

    const meValue = cache.readQuery({
      query: MeQuery,
    });

    if (!meValue) {
      console.log("Resetting all storage data");
      await StorageService.clearAll();
    }
  }

  return cache;
};
