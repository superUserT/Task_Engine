import type { TransportOptions } from 'nodemailer';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { errorMessages } from '../utils/helper_objects';

if (!process.env['SMTP_SERVER'] || !process.env['SMTP_LOGIN']) {
  throw new Error(errorMessages.smtpEnvMissing);
}

const transporter = nodemailer.createTransport({
  host: process.env['SMTP_SERVER'],
  port: Number(process.env['SMTP_PORT']) || 587,
  secure: false,
  auth: {
    user: process.env['SMTP_LOGIN'],
    pass: process.env['SMTP_PASSWORD']!,
  },
} as TransportOptions);

export default transporter;
