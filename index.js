require('dotenv').config()
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/routes';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://evandweck:e.d.1031@ds153890.mlab.com:53890/person');
if (process.env.NODE_ENV == 'development') {
    // connect to dev database
    mongoose.connect(process.env.DB_URI_DEVELOPMENT);
} else if (process.env.NODE_ENV == 'test') {
    // connect to test database
    mongoose.connect(process.env.DB_URI_TEST);
} else {
  console.log('No database connection... exiting...')
}

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Server now running on port ${PORT}`)
);

module.exports = app;
