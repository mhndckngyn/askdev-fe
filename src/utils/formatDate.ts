import dayjs from 'dayjs';

const formatDate = (day: string) => {
  return dayjs(day).format('HH:mm, DD/MM/YYYY');
};

export default formatDate;
