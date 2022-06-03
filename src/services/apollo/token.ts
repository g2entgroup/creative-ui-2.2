interface authToken {
  token: {
    accessToken: string
    refreshToken: string
  }
}
export const setAuthenticationToken = ({ token }: authToken) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('creative_access_token', token.accessToken)
    localStorage.setItem('creative_refresh_token', token.refreshToken)
  }
}

export const getAuthenticationToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('creative_access_token')
    return token
  }
}

export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('creative_refresh_token')
    return token
  }
}

export const removeAuthenticationToken = async () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('creative_access_token')
    localStorage.removeItem('creative_refresh_token')
  }
}
