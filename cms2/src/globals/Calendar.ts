import { isLoggedIn } from '@/access/validation'
import { GlobalConfig } from 'payload'

const calendar: GlobalConfig = {
  slug: 'calendar',
  label: 'Calendar',
  access: {
    read: isLoggedIn,
    update: isLoggedIn,
  },
}
