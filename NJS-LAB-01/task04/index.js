const _ = require('lodash');
const fs = require('fs');

// 1. Отримання значення з об'єкта
const person = {
  name: 'John Doe',
  age: 30
};

const age = _.get(person, 'age');

// 2. Перевірка наявності значення в об'єкті
const hasAge = _.has(person, 'age');

// 3. Відфільтрований масив
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = _.filter(numbers, n => n % 2 === 0);

// 4. Створення нового масиву з елементами, перетвореними за допомогою функції
const strings = _.map(numbers, n => n.toString());

// 5. Об'єднання масивів
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combinedArray = _.concat(array1, array2);

// Запис результатів в файл
const results = {
  age,
  hasAge,
  evenNumbers,
  strings,
  combinedArray
};

fs.writeFile('task04/process.argv', JSON.stringify(results), err => {
  if (err) throw err;
  console.log('Результати записані в файл process.argv');
});
