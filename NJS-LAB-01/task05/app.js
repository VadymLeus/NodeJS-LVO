const yargs = require('yargs');
const userModule = require('./user');

// Додавання команди для додавання мови
yargs.command({
  command: 'addLanguage',
  describe: 'Add a language to user',
  builder: {
    title: {
      describe: 'Title of the language',
      demandOption: true,
      type: 'string'
    },
    level: {
      describe: 'Language level',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const language = { title: argv.title, level: argv.level };
    userModule.addLanguage(language);
  }
});

// Додавання команди для перегляду мов користувача
yargs.command({
  command: 'viewLanguages',
  describe: 'View user languages',
  handler() {
    userModule.viewLanguages();
  }
});

// Додавання команди для видалення мови
yargs.command({
  command: 'removeLanguage',
  describe: 'Remove a language from user',
  builder: {
    title: {
      describe: 'Title of the language to be removed',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    userModule.removeLanguage(argv.title);
  }
});

// Парсинг команд
yargs.parse();
