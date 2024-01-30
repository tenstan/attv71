import { getCalendar, type Calendar } from "$lib/server/cms/get-calendar";
import type { PageServerLoad } from "./$types";

export interface CalendarData {
  calendar: Calendar;
}

export const load: PageServerLoad = async ({ fetch }): Promise<CalendarData> => {
  const calendar = await getCalendar(fetch);
  
  return {
    calendar
  };
}