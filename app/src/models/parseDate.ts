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
