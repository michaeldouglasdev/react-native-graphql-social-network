import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import * as Crypto from "expo-crypto";

const crypto = (value: string) => {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, value);
};

export const pqLink = createPersistedQueryLink({ sha256: crypto });
