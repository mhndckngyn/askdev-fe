import moment from 'moment-timezone';

const FormatTime = ({ createdAt }: { createdAt: string }) => {
  const timeAgo = moment.utc(createdAt).tz('Asia/Ho_Chi_Minh').fromNow();

  return <span>{timeAgo}</span>;
};

export default FormatTime;
