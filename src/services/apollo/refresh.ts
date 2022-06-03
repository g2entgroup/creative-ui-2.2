import { gql } from '@apollo/client/core'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import { LENS_API_URL } from './constants'

export const REFRESH_AUTHENTICATION = `
  mutation ($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`

export const refreshAuth = (refreshToken: string) => {
  return apolloClient.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      request: {
        refreshToken,
      },
    },
  })
}

const apolloClient = new ApolloClient({
  uri: LENS_API_URL,
  cache: new InMemoryCache(),
})
