import { setContext } from "@apollo/client/link/context";
import { StorageService } from "@/services/storage.service";

export const AuthorizationLink = setContext(async (_, { headers }) => {
  const token = await StorageService.getItemString("TOKEN_AUTH");
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});
