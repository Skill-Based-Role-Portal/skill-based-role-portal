export default function TimeAgo(dateString) {
  const currentDate = new Date();
  const date = new Date(dateString);
  const timeDifference = currentDate - date;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  if (timeDifference < oneDayInMilliseconds) {
    // Less than 1 day ago
    return '24h';
  } else {
    // More than 1 day ago
    const daysAgo = Math.ceil(timeDifference / oneDayInMilliseconds);

    return daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`;
  }
}
