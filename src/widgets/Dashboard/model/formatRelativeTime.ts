export const formatRelativeTime = (date: string) => {
  const currentDate = new Date().getTime();
  const pastDate = new Date(date).getTime();
  const diffInSeconds = (currentDate - pastDate) / 1000;
  if (diffInSeconds >= 2592000) {
    const time = (diffInSeconds / 2592000).toFixed(0);
    return new Intl.RelativeTimeFormat("en").format(-+time, "month");
  } else if (diffInSeconds >= 86400) {
    const time = (diffInSeconds / 86400).toFixed(0);
    if (+time === 1) return "yesterday";
    return new Intl.RelativeTimeFormat("en").format(-+time, "day");
  } else if (diffInSeconds >= 3600) {
    const time = (diffInSeconds / 3600).toFixed(0);
    return new Intl.RelativeTimeFormat("en").format(-+time, "hour");
  } else if (diffInSeconds <= 60) {
    return "just now";
  } else {
    const time = (diffInSeconds / 60).toFixed(0);
    return new Intl.RelativeTimeFormat("en").format(-+time, "minute");
  }
};
