import { format } from "date-fns";

export const getFormattedDateTime = (dateTime: Date) =>
  format(dateTime, "dd/MM/yyyy hh:mm a");
