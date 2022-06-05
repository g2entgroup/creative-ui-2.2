import {PrivateKey} from '@textile/hub';
import { useEffect } from 'react';

export const getIdentity = async () => {
  /** Restore any cached user identity first */
  const cached = localStorage.getItem("user-private-identity")
  if (cached !== null) {
    /** Convert the cached identity string to a PrivateKey and return */
    return PrivateKey.fromString(cached)
  }
  else {
      return undefined;
  }
//   /** No cached identity existed, so create a new one */
//   const identity = await PrivateKey.fromRandom()
//   /** Add the string copy to the cache */
//   localStorage.setItem("user-private-identity", identity.toString())
//   /** Return the random identity */
//   return identity
}