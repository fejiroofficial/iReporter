/* eslint linebreak-style: 0 */
/* eslint no-console: "off" */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import router from './routes';

const app = express();
dotenv.config();

const port = process.env.PORT || 3571;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.status(200).json({
    success: 'true',
    message: 'Welcome to home page',
  });
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
