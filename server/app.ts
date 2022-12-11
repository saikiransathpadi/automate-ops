import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './src/routes/v1';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/automate/ops/api/v1', router);
app.get('/automate/ops/api/v1/health', (req, res) => {
  res.send('Working!!');
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
  console.log('Node Environment-', process.env.NODE_ENV);
});
