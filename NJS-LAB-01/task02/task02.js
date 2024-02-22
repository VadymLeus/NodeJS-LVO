const fs = require('fs');

const filePath = './task02/task02.txt';
const newLine = 'Hello, World!';

fs.appendFile(filePath, newLine + '\n', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Рядок успішно додано до файлу!');
  }
});
