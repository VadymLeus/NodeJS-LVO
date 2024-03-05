const yargs = require('yargs');
const user = require('./user');

yargs
  .command({
    command: 'add',
    describe: 'Додати мову',
    builder: {
      title: {
        demandOption: true,
        alias: 't',
        description: 'Назва мови',
      },
      level: {
        demandOption: true,
        alias: 'l',
        description: 'Рівень володіння',
      },
    },
    handler: (argv) => {
      user.add(argv.title, argv.level);
      console.log(`Мова "${argv.title}" додана`);
    },
  })
  .command({
    command: 'remove',
    describe: 'Видалити мову',
    builder: {
      title: {
        demandOption: true,
        alias: 't',
        description: 'Назва мови',
      },
    },
    handler: (argv) => {
      user.remove(argv.title);
      console.log(`Мова "${argv.title}" видалена`);
    },
  })
  .command({
    command: 'list',
    describe: 'Список мов',
    handler: () => {
      const languages = user.list();
      console.log('Список мов:');
      languages.forEach(lang => console.log(`  - ${lang.title} (${lang.level})`));
    },
  })
  .command({
    command: 'read',
    describe: 'Інформація про мову',
    builder: {
      title: {
        demandOption: true,
        alias: 't',
        description: 'Назва мови',
      },
    },
    handler: (argv) => {
      const language = user.read(argv.title);
      console.log(`Інформація про мову: "${language.title}":`);
      console.log(`  - Рівень: ${language.level}`);
    },
  })
  .help()
  .argv;
