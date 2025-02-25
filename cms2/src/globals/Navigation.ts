import type { GlobalConfig } from 'payload'
import { isLoggedIn } from '../access/validation'

const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: isLoggedIn,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 10,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'href',
          type: 'text',
        },
        {
          name: 'children',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'href',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export default Navigation
