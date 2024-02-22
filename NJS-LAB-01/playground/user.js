const fs = require('fs');

const FILE_NAME = './playground/user.json';

function add(title, level) {
  const data = readData();
  if (data.languages.find(lang => lang.title === title)) {
    throw new Error(`Мова "${title}" уже є`);
  }
  data.languages.push({ title, level });
  saveData(data);
}

function remove(title) {
  const data = readData();
  const index = data.languages.findIndex(lang => lang.title === title);
  if (index === -1) {
    throw new Error(`Мова "${title}" не знайдена`);
  }
  data.languages.splice(index, 1);
  saveData(data);
}

function list() {
  const data = readData();
  return data.languages;
}

function read(title) {
  const data = readData();
  const language = data.languages.find(lang => lang.title === title);
  if (!language) {
    throw new Error(`Мова "${title}" не знайдена`);
  }
  return language;
}

function readData() {
  try {
    return JSON.parse(fs.readFileSync(FILE_NAME));
  } catch (err) {
    return { languages: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(FILE_NAME, JSON.stringify(data, null, 2));
}

module.exports = { add, remove, list, read };