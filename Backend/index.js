const express = require('express')
const morgan = require('morgan');
const logger = require("./logger")
const productRoutes = require('./Routes/productRoutes');
// const router = require('./Routes/router')
require('dotenv').config()
const connectToMongo = require('./db')

connectToMongo();
const app = express()

const port = process.env.PORT || 3001
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// app.use(morgan('dev'));
// app.use(morgan('[:date] ":method :url HTTP/:http-version" :status :res[content-length] ":user-agent"'));

// Morgan → Winston
app.use(morgan((tokens, req, res) => {
  const log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
  logger.info(log); // Send to Loki + Console
  return null; // Prevent default console output
}));

const cors = require('cors')
const allowedOrigins = [
  'https://d-froten-e3c46d57.computesphere.site',
  'http://localhost:3000'
];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // For legacy browser support
}));

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// app.use(cors());
app.use(express.json());
// app.use(router);
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Backend app is listening on port ${port}`)
  logger.info('Server running on http://localhost:' + port);
})
