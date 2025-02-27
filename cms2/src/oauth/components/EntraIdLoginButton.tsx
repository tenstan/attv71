'use client'

import Link from 'next/link'

export const EntraIdLoginButton = () => (
  <Link href="/api/users/oauth/entra">
    <button>Continue to Entra Id</button>
  </Link>
)
