export const isEmpty = (value: any) => value === undefined || value === null || new String(value).length === 0;

export const { COMPANY = 'Automate Ops' } = process.env;

export const EMAIL_SUBJECTS = {
    OPT_VERIFICATION_SUBJECT: `Please verify your email - ${COMPANY}`,
    OPT_PASSWORD_RESET_SUBJECT: `Reset password - ${COMPANY}`,
}

export const OtpEmailTemplate = (otp: number) =>
    `<p>Hello, <br><br>Thank you for signing up <b>${COMPANY}</b>. Your Otp to confirm email is <b>${otp}</b>. 
    OTP is valid for 5 min. Please contact us if you have any other queries <br><br>Thanks,<br>Team ${COMPANY}.</p>`;

export const forgotPassEmailTemplate = (otp: number) =>
    `<p>Hello, <br><br>Otp to reset your password is <b>${otp}</b>. 
    OTP is valid for 5 min. Please contact us if you have any other queries <br><br>Thanks,<br>Team ${COMPANY}.</p>`;

export const generateOtpSixDigit = () => Math.floor(Math.random() * 1000000);
