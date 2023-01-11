import { Router } from 'express';
import {
    getUsers,
    sendOtpForEmailVerification,
    udpatePasswordReset,
    UpdatePasswordForgot,
    userLogIn,
    userSignUp,
    validateAndUpdateOtpLogs,
} from '../../controller';
import { authenticatedRouter } from '../../middleware/auth';
import { validateCurrentPassword } from '../../middleware/security';
import { newPasswordValidation, signUpValidation, validateAndUpdateOtpLogsMiddleware } from '../../validators';

const dashboardRouter = Router();

dashboardRouter.route('/user').get(authenticatedRouter, getUsers);

dashboardRouter.route('/user/signup').post(signUpValidation, userSignUp);
dashboardRouter.route('/user/login').post(userLogIn);

dashboardRouter.route('/user/forgot/password').post(newPasswordValidation, validateAndUpdateOtpLogsMiddleware, UpdatePasswordForgot);
dashboardRouter
    .route('/user/reset/password')
    .post(authenticatedRouter, validateCurrentPassword, newPasswordValidation, udpatePasswordReset);

dashboardRouter.route('/otp/email').put(sendOtpForEmailVerification).post(validateAndUpdateOtpLogs);

export default dashboardRouter;
