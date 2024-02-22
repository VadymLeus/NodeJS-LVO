const yargs = require('yargs');
const user = require('./user');

const argv = yargs
  .command('add', 'Додати мову', {
    title: {
      demand: true,
      alias: 't',
      description: 'Назва мови',
    },
    level: {
      demand: true,
      alias: 'l',
      description: 'Рівень володіння',
    },
  })
  .command('remove', 'Видалити мову', {
    title: {
      demand: true,
      alias: 't',
      description: 'Назва мов',
    },
  })
  .command('list', 'Список мов')
  .command('read', 'Інформація про мову', {
    title: {
      demand: true,
      alias: 't',
      description: 'Назва мови',
    },
  })
  .help()
  .argv;

try {
  switch (argv._[0]) {
    case 'add':
      user.add(argv.title, argv.level);
      console.log(`Мова "${argv.title}" додана`);
      break;
    case 'remove':
      user.remove(argv.title);
      console.log(`Мова "${argv.title}" видалена`);
      break;
    case 'list':
      const languages = user.list();
      console.log('Список мов:');
      languages.forEach(lang => console.log(`  - ${lang.title} (${lang.level})`) );
      break;
    case 'read':
      const language = user.read(argv.title);
      console.log(`Інформація про мову: "${language.title}":`);
      console.log(`  - Рівень: ${language.level}`);
      break;
  }
} catch (err) {
  console.error(err.message);
}
