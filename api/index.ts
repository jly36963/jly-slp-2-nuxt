// package imports
import express from 'express';
import pino from 'express-pino-logger';
// env
require('dotenv').config();
// router imports
import index from './routes/api/index';

// app instance
const app = express();
// middleware
app.use(pino({ prettyPrint: true }));
// use routers
app.use('/', index);

// export app
export default app;
