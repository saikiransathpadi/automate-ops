require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './src/routes/v1';
import { mongooseConnect } from './src/db/mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { COMPANY } from './src/utils/helper';
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const swaggerDefinition = {
    info: {
        title: COMPANY,
        version: '1.0.0',
        description: 'Automating Manual Operations',
    },
    basePath: '/automate/ops/api/v1',
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./apiDocs/**/*.yaml'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/automate/ops/api/v1', router);
app.get('/automate/ops/api/v1/health', (req, res) => {
    res.send('Working!!');
});

console.log('Is running on docker', process.env.local)

app.use(function (req, res) {
    console.log(req);
    return res.status(404).json({
        message: 'Unexpected Error, Resource Not found.',
        developer_message: 'Route Not Found',
    });
});

const port = process.env.PORT || 8080;

app.listen(port, async () => {
    await mongooseConnect();
    console.log(`The application is listening on port ${port}!`);
    console.log('Node Environment-', process.env.NODE_ENV);
});
