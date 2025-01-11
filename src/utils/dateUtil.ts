import { format } from "date-fns";

export const getFormattedDateTime = (dateTime: Date) =>
  format(dateTime, "yyyy-MM-dd hh:mm a");
