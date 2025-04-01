export function countDownFun(time) {
  if (time < 0) {
    return '00:00:00';
  } else {
    const h = Math.floor((time / 3600) % 24);
    const m = Math.floor((time / 60) % 60);
    const s = Math.floor(time % 60);
    let res = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s
      }`;
    return res;
  }
}
