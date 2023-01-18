import { Router } from 'express';
import { createUser } from '../../controller';
import { authenticatedRouter } from '../../middleware/auth';

const appRouter = Router();

appRouter.route('/user').get(authenticatedRouter, createUser);

export default appRouter;
