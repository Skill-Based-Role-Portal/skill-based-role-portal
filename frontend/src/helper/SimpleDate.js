export default function SimpleDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return isNaN(date) ? "31 Dec 9999" : `${day} ${month} ${year}`;
}
