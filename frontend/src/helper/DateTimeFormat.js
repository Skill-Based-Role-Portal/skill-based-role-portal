export default function DateTimeFormat(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const HH = date.getHours();
  const MM = date.getMinutes();
  const SS = date.getSeconds();

  const hours = ("0" + HH).slice(-2);
  const minutes = ("0" + MM).slice(-2);
  const seconds = ("0" + SS).slice(-2);

  return isNaN(date)
    ? "31 Dec 9999 00:00:00"
    : `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}
