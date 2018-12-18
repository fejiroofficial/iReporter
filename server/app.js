/* eslint linebreak-style: 0 */
/* eslint no-console: "off" */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import router from './routes';
import middlewares from './middlewares';

const app = express();
dotenv.config();

const port = process.env.PORT || 3571;

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', express.static('UI'));

app.use((req, res, next) => {
  if (!middlewares.verifyToken) {
    res.sendFile('login.html');
  } else {
    next();
  }
});

app.use('/api/v1', router);

app.use('*', (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: 'false',
    message: err.message,
  });
  next();
});

app.listen(port, () => console.log(`Running on port ${port}...`));

export default app;
