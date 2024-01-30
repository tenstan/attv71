export interface Calendar {
  id: string;
  activities?: {
    title: string;
    date: string;
    moreinfo?: string | null;
  }[]
}