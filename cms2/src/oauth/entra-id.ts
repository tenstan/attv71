import { OAuth2Plugin } from 'payload-oauth2'
import { Users } from 'src/collections/Users'

export const entraIdOAuthPlugin = OAuth2Plugin({
  enabled:
    !!process.env.ENTRA_ID_CLIENT_ID &&
    !!process.env.ENTRA_ID_CLIENT_SECRET &&
    !!process.env.ENTRA_ID_TENANT_ID,
  strategyName: 'entraId',
  useEmailAsIdentity: true,
  serverURL: process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3010',
  clientId: process.env.ENTRA_ID_CLIENT_ID ?? '',
  clientSecret: process.env.ENTRA_ID_CLIENT_SECRET ?? '',
  authorizePath: '/oauth/entra',
  callbackPath: '/oauth/entra/callback',
  authCollection: Users.slug,
  tokenEndpoint: `https://login.microsoftonline.com/${process.env.ENTRA_ID_TENANT_ID}/oauth2/v2.0/token`,
  scopes: ['openid', 'profile', 'email'],
  providerAuthorizationUrl: `https://login.microsoftonline.com/${process.env.ENTRA_ID_TENANT_ID}/oauth2/v2.0/authorize`,
  getUserInfo: async (accessToken) => {
    const response = await fetch('https://graph.microsoft.com/oidc/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const user = await response.json()
    return { email: user.email, sub: user.sub }
  },
  successRedirect: () => '/admin',
  failureRedirect: (req, err) => {
    req.payload.logger.error(err)
    return '/admin/login'
  },
})
