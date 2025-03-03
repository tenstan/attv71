'use client'

import Link from 'next/link'

export const EntraIdLoginButton = () => (
  <Link href="/api/users/oauth/entra">
    <button
      style={{ width: '100%' }}
      className="btn btn--icon-style-without-border btn--size-large btn--withoutPopup btn--style-primary"
    >
      Sign in with Microsoft
    </button>
  </Link>
)
