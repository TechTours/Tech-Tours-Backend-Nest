/* eslint-disable */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(
    to: string,
    name: string,
    token: string,
    password?: string | null,
    reset?:boolean
  ) {
    try {
      let mailOptions;
      if (password && password != null && !reset) {
        mailOptions = {
          from: 'techtour06@gmail.com',
          to: to,
          subject: 'TechTours Email Verification',
          html: `
          Hello ${name}, <br />
  
          We are pleased to welcome you to TechTours. 
          
          <br />

          To Login use your current password name make sure you change it after you login <br />

          Yor Current Password : ${password} <br />

          Take this time to verify your email by clicking the link below: <br />
          
          ${this.configService.get<string>(
            'FRONTEND_URL',
          )}/verify?token=${token}&email=${to}
          `,
        };
      }
      else if(reset){
        mailOptions = {
          from: 'techtour06@gmail.com',
          to,
          subject: 'TechTours Password Reset Email',
          html: `
          Hello <strong>${name}</strong>, <br />
          
          This email serves to allow you reset your password , If you did not ask for this email <br />
          you can just ignore it.
          
          ${this.configService.get<string>(
            'FRONTEND_URL',
          )}/verify?token=${token}&email=${to}
          `,
        };
      } else {
        mailOptions = {
          from: 'techtour06@gmail.com',
          to,
          subject: 'TechTours Email Verification',
          html: `
          Hello ${name}, <br />
  
          We are pleased to welcome you to TechTours. Take this time to verify your email by clicking the link below: <br />
          
          ${this.configService.get<string>(
            'FRONTEND_URL',
          )}/verify?token=${token}&email=${to}
          `,
        };
      }

      await this.transporter.sendMail(mailOptions);
      return 'Email sent successfully';
    } catch (error) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }
}
