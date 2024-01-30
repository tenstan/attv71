import { getServerConfiguration } from "../configuration";
import type { Calendar as CmsCalendar } from "./types/calendar";

export const getCalendar = async (skFetch: typeof fetch): Promise<Calendar> => {
  const configuration = getServerConfiguration();

  const res = await skFetch(`${configuration.CMS_BASE_URL}api/globals/calendar?depth=1`, {
    headers: {
      'Authorization': `api-keys API-Key ${configuration.CMS_API_KEY}`
    }
  })

  const responseContent = await res.json() as CmsCalendar;

  return {
    activities: responseContent.activities?.map(activity => ({
      title: activity.title,
      date: new Date(activity.date),
      moreInfo: activity.moreinfo ?? ''
    })) ?? []
  };
}

export interface Calendar {
  activities: {
    title: string;
    date: Date;
    moreInfo: string;
  }[]
}
