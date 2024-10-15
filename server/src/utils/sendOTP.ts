import nodemailer from 'nodemailer';

export const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
    try {
        const { EMAIL_USER, EMAIL_PASS } = process.env;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: EMAIL_USER,
            to: email,
            subject: 'Your One-Time Password (OTP)',
            html: `
                <p>Dear user,</p>
                <p>Your one-time password (OTP) is: <strong>${otp}</strong></p>
                <p>Please use this OTP to complete your verification. It is valid for 10 minutes.</p>
                <p>If you did not request this OTP, please ignore this email.</p>
                <p>Thank you!</p>
            `,
        };

        await transporter.sendMail(mailOptions);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to send email: ${error.message}`);
        } else {
            throw new Error('Failed to send email due to an unexpected error');
        }
    }
};