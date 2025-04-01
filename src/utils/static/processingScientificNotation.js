export default function (number) {
  let n = number + "";
  let str;
  if (n.includes("e")) {
    let num = n;
    const length = num.split("-")[1] * 1;
    const nums = num.split("-")[0].slice(0, -1);
    let zeroNum = "";
    if (!nums.includes(".")) {
      for (let i = 0; i < length - nums.length; i++) {
        zeroNum += "0";
      }
      str = `0.${zeroNum}${nums}`;
    } else {
      let num1 = nums.split(".")[0] + nums.split(".")[1];

      for (let i = 0; i < length - nums.split(".")[0].length; i++) {
        zeroNum += "0";
      }
      str = `0.${zeroNum}${num1}`;
    }
  } else {
    str = n;
  }
  // console.log("str", str);
  return str;
}
