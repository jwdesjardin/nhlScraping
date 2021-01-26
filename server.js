const express = require('express');
const dotenv = require('dotenv');

const app = express();

express.json();

const routes = require('./routes/routes.js');

app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
