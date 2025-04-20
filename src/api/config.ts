export const config = {
  // baseURL: import.meta.env.VITE_API_ENDPOINT || 'https://api.quizzfly.site/api/v1',
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'https://localhost:3000/api/v1',

  path: {
    refreshToken: 'auth/refresh',
  },
  key: {
    refreshToken: 'refresh_token', //KEY SAVED IN LOCALSTORAGE
    accessToken: 'access_token', //KEY SAVED IN LOCALSTORAGE
  },
  retryStatusCodes: [401],
}
