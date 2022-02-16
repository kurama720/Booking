export const parseDate = (date: Date) => {
  const dateYear = date.getFullYear();
  let dateMonth: number | string = date.getMonth() + 1;
  let dateDay: number | string = date.getDate();

  if (dateMonth < 10) {
    dateMonth = `0${dateMonth.toString()}`;
  }

  if (dateDay < 10) {
    dateDay = `0${dateDay.toString()}`;
  }

  return `${dateYear}-${dateMonth}-${dateDay}`;
};

export const parseDateReserve = (checkIn: string, checkOut: string) => {
  const dateFirst = new Date(checkIn).getTime();
  const dateSecond = new Date(checkOut).getTime();

  return (dateSecond - dateFirst) / (1000 * 60 * 60 * 24);
};

export const dateFormat = (date: string) => {
  const today = new Date(date);
  const dateYear = today.getFullYear();
  const dataMonth = today.toLocaleString("en-US", { month: "short" });
  const dateDay: string | number = today.getDate();

  return `${dataMonth} ${dateDay}, ${dateYear}`;
};

export const dateFormatForPolicy = (date: string) => {
  const today = new Date(date);
  const dataMonth = today.toLocaleString("en-US", { month: "short" });
  const dateDay: string | number = today.getDate();
  return `${dateDay} ${dataMonth}`;
};

export const getDiffInDays = (start: Date | null, end: Date | null) => {
  if (!start || !end) return 1;
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = end.getTime() - start.getTime();
  return Math.round(diffInTime / oneDay);
};
