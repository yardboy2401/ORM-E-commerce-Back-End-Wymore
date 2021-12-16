//require express
const express = require('express');

//require routes folder
const routes = require('./routes');

// import sequelize connection
const sequelize = require('./config/connection');

//create instance of express for app variable
const app = express();

//declaring PORT for live deployment or localhost PORT number
const PORT = process.env.PORT || 3001;

//express use of json format
app.use(express.json());

//express middleware
app.use(express.urlencoded({ extended: true }));

//express middleware for routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
});
