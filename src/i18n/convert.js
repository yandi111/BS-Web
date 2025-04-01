
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");


// read the file
const workbook = XLSX.readFile(path.join(__dirname, './BSEX_多语言翻译.xlsx'));
const sheetName = workbook.SheetNames[0]; // 假设数据在第一个工作表
const worksheet = workbook.Sheets[sheetName];

// convert the data to JSON
let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// get the languages from the first row
const languages = data[0].slice(1);

const headers = data[0][0];

// output directory
const outputDir = path.join(__dirname, "translations");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// for each language, create a JSON file
languages.forEach((lang) => {
  const langData = {};
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const key = row[0];
    langData[key] = row[languages.indexOf(lang) + 1];
  }

  // define output file path
  const filePath = path.join(outputDir, `${lang}.json`);
  //  write JSON file
  fs.writeFileSync(filePath, JSON.stringify(langData, null, 2));
  console.log(`已生成 ${lang}.json`);
});

console.log("所有语言的 JSON 文件已生成完毕。");
