const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d378f52a93af7b39e9093d209941221&units=metric`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching weather data');
  }
};

// Обробник шляху /
app.get('/', (req, res) => {
  res.render('partials/header', (err, headerHtml) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error rendering header');
    }
    res.render('partials/footer', (err, footerHtml) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error rendering footer');
      }
      res.write(headerHtml);
      res.write(footerHtml);
      res.end();
    });
  });
});

// Обробник шляху /weather
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Kyiv';

  try {
    const weatherData = await getWeatherData(city);
    const cities = ['Kyiv', 'Zhytomyr', 'Lviv', 'Sumy'];

    res.render('weather', {
      city: city,
      weatherIcon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      weatherDescription: weatherData.weather[0].description,
      cities: cities
    });
  } catch (error) {
    res.status(500).send('Error retrieving weather data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});