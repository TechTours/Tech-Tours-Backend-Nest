// src/email/email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
  private transporter;

  constructor(
    private readonly configService:ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, name: string, token: string) {
    try {
      const mailOptions = {
        from: 'hallcoder25@gmail.com',
        to,
        subject: 'TechTours Email Verification',
        html: `
        Hello ${name}, <br />

        We are pleased to welcome you to TechTours. Take this time to verify your email by clicking the link below: <br />
        
        ${this.configService.get<string>('FRONTEND_URL')}/verify?token=${token}?email=${to}
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return 'Email sent successfully';
    } catch (error) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }
}
