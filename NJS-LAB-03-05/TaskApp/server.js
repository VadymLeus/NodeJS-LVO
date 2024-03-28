// Підключення необхідних модулів
require('dotenv').config(); // Завантаження данних з файлу .env
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// Підключення маршутів
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userListRoutes = require('./routes/userListRoutes');

// Екземпляр Express
const app = express();

// Налаштування middleware та сесії
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

// Middleware для перевірки авторизації
function requireAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

// Middleware для передачі ідентифікатора користувача в шаблони
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

// Налаштування для  файлів .hbs
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Підключення до бд MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected')) // Перевірка звязку з бд
  .catch(err => console.error(err)); // Помилка, якщо є проблеми з підключенням до бд

// Підключаємо маршрути до додатка
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/user/tasks', requireAuth, taskRoutes);
app.use(userListRoutes); // Інші маршути

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!'); // Надсилаємо клієнту повідомлення про помилку
});

// Middleware для перенаправлення на сторінку авторизації в разі звернення до неіснуючого маршруту
app.use((req, res, next) => {
  res.redirect('/auth/login');
});

// Запускаємо сервер на зазначеному порту
const PORT = process.env.PORT || 3000; // Порт для сервера
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
