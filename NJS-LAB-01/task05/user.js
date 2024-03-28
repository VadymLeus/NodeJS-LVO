const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'user.json');

// Функція для читання користувача з файлу
const getUser = () => {
  try {
    const userData = fs.readFileSync(filePath);
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error reading user data:", error);
    return null;
  }
};

// Функція для збереження користувача в файл
const saveUser = (userData) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
    console.log("User data saved successfully.");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Додавання мови користувачу
const addLanguage = (language) => {
  const user = getUser();
  if (user) {
    if (!user.languages.some(lang => lang.title === language.title)) {
      user.languages.push(language);
      saveUser(user);
      console.log(`Language "${language.title}" added to user.`);
    } else {
      console.log(`User already knows "${language.title}".`);
    }
  }
};

// Перегляд мов користувача
const viewLanguages = () => {
  const user = getUser();
  if (user) {
    console.log("User languages:");
    user.languages.forEach((language, index) => {
      console.log(`${index + 1}. Title: ${language.title}, Level: ${language.level}`);
    });
  }
};

// Видалення мови користувача
const removeLanguage = (languageTitle) => {
  const user = getUser();
  if (user) {
    const languageIndex = user.languages.findIndex(lang => lang.title === languageTitle);
    if (languageIndex !== -1) {
      user.languages.splice(languageIndex, 1);
      saveUser(user);
      console.log(`Language "${languageTitle}" removed from user.`);
    } else {
      console.log(`User doesn't know "${languageTitle}".`);
    }
  }
};

module.exports = {
  addLanguage,
  viewLanguages,
  removeLanguage
};
