export default function DateTimeFormat(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return isNaN(date)
    ? "31 Dec 9999 00:00:00"
    : `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}
