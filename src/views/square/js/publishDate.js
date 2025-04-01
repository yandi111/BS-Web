import langs from "@/i18n/i18nLocale";
const publishDate = (date) => {
  let time = date;
  const now = Math.floor(Date.now() / 1000);
  const publish_time = date.includes(":")
    ? Date.parse(date) / 1000
    : date / 1000;

  const m = 60;
  const h = 60 * 60;
  const d = 24 * 60 * 60;
  const difference = now - publish_time;

  if (difference < m) {
    time = langs.t("lang_3136");
  } else if (difference < h - m) {
    const value = Math.ceil(difference / m);
    time = langs.t("分钟前", [value]);
  } else if (difference < d - m) {
    const value = Math.ceil(difference / h);
    time = langs.t("小时前", [value]);
  } else if (difference < 2 * d - m) {
    time = langs.t("lang_3139");
  } else {
    const d = new Date(publish_time * 1000);
    const mon =
      d.getMonth() * 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    time = `${mon}-${day} ${hour}:${min}:${sec}`;
  }
  return time;
};
export default publishDate;
