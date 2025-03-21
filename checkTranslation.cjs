const fs = require("fs");

function readJSONFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function compareKeys(file1, file2) {
  const keys1 = new Set(Object.keys(file1));
  const keys2 = new Set(Object.keys(file2));

  const onlyInJson1 = [...keys1].filter((key) => !keys2.has(key));
  const onlyInJson2 = [...keys2].filter((key) => !keys1.has(key));

  if (onlyInJson1.length === 0 && onlyInJson2.length === 0) {
    console.log("Good to go!");
  } else {
    console.log("Keys only in en.json: ", onlyInJson1);
    console.log("Keys only in vi.json: ", onlyInJson2);
  }
}

const file1 = "./src/locales/en.json";
const file2 = "./src/locales/vi.json";

const json1 = readJSONFile(file1);
const json2 = readJSONFile(file2);

if (json1 && json2) {
  compareKeys(json1, json2);
}
