import dateformat from 'dateformat';

export const formatDate = (date) => {
  const formattedDate = dateformat(date, 'dd/mm/yyyy');
  return formattedDate;
}

