import { TODAY } from 'constants/index';

export const createToday = () => {
  return new Date(TODAY);
};

export const datesAreOnSameDay = (first: Date, second: Date) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};
