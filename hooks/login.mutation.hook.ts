import {
  FragmentType,
  getFragmentData,
  graphql,
} from "@/graphql/__generated__";
import { LoginInput } from "@/graphql/__generated__/graphql";
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  TypedDocumentNode,
  useMutation,
} from "@apollo/client";
import { MeQuery } from "./me.query.hook";
import { StorageService } from "@/services/storage.service";
import { MutationFunction } from "./types/mutation-function.type";

export const LoginMutationFragment = graphql(`
  fragment LoginMutationFragment on Mutation {
    login(data: $dataLogin) {
      user {
        id
        name
        username
        email
        role
        ...UserAvatar
      }
      accessToken
      expirationTime
    }
  }
`);
const LoginMutation = graphql(`
  mutation Login($dataLogin: LoginInput!) {
    ...LoginMutationFragment
  }
`);

type UseLoginMutationOptions = MutationFunction<typeof LoginMutation>;

export const useLoginMutation = () => {
  const fragment = LoginMutationFragment;
  const [mutation] = useMutation(LoginMutation);

  const execute = (options: UseLoginMutationOptions) => {
    mutation({
      ...options,
      update: async (cache, result, ...rest) => {
        if (options.update) {
          options.update(cache, result, ...rest);
        }
      },
    });
  };

  return {
    loginMutation: execute,
    loginFragment: fragment,
  };
};
