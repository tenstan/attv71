import { GlobalConfig } from 'payload/types'
import { isLoggedIn } from '../access/validation'
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import payload from 'payload'

const Calendar: GlobalConfig = {
  slug: 'calendar',
  label: 'Calendar',
  access: {
    read: isLoggedIn,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'activities',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data }: RowLabelArgs) => {
            if (data?.title && data.date) {
              return `${data.title} ${new Date(data.date).toLocaleDateString()}` 
            }
          
            return data?.title ?? 'New Activity';
          },
        },
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'date',
              type: 'date',
              required: true,
            },
          ]
        },
        {
          name: 'moreinfo',
          type: 'textarea',
          label: 'Additional Information',
        }
      ],
    },
  ],
}

export default Calendar