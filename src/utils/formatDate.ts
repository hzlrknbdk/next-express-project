export const formatDate = (date: string) => {
  if (!date) {
    return "";
  }

  const [year, month, day] = date?.split("-");
  if (!year || !month || !day) {
    return "";
  }

  return `${day}.${month}.${year}`;
};
