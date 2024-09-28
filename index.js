const express = require('express');
const app = express();
const PORT = 8080;

const { dbConnection } = require('./config/config');
const routes = require('./routes/posts.js');

app.use(express.json());
app.use('/', routes);

dbConnection();


if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;