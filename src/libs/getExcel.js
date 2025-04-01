import xlsx from "xlsx";
import axios from "axios";
let url = `${process.env.BASE_URL}demo.xlsx`

export const trans = (sheets) => {
  const content = [];
  const tmplist = [];
  for (const key in sheets) {
    tmplist.push(xlsx.utils.sheet_to_json(sheets[key]).length);
    content.push(xlsx.utils.sheet_to_json(sheets[key]));
  }
  // console.log(tmplist);
  return content[0];
};

export const getSheet = () => {
  return axios.get(url, { responseType: "arraybuffer" });
};
