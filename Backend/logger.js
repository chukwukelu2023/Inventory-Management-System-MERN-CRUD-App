const winston = require('winston');
const LokiTransport = require('winston-loki');
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production';
console.log(process.env.LOKI_URL)

const transport = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  }),
];

// Only push logs to Grafana Loki in production
// if (isProd) {
//   const lokiTransport = new LokiTransport({
//     host: `${process.env.LOKI_URL}`, // e.g. http://localhost:3100
//     labels: { service: 'mern-app', env: process.env.NODE_ENV },
//     json: true,
//     batching: true,
//     interval: 5,
//     replaceTimestamp: true,
//   });
//   lokiTransport.on('error', (err) => {
//     console.error('LokiTransport error:', err);
//   });
//   transport.push(lokiTransport);
// }

const logger = winston.createLogger({
  level: 'info',
  transports: transport,
});

module.exports = logger;

