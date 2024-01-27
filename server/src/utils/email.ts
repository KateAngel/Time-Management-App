import config from "config";
import nodemailer from 'nodemailer';
import pug from 'pug';
import { convert } from 'html-to-text';

import { User } from "../entities/user.entity";

const smtp = config.get<{
    host: string;
    port: number;
    user: string;
    pass: string;
  }>('smtp');

  
export default class Email {
    // firstName: string;
    to: string;
    from: string;
    constructor(public user: User, public url: string) {
        // this.firstName = user.name.split(' ')[0];
        this.to = user.email;
        this.from = `Horae Harbor ${config.get<string>('emailFrom')}`;
    }

    private newTransport() {
        // if (process.env.NODE_ENV === 'production') {
        //   console.log('Hello')
        // }

        return nodemailer.createTransport({
        ...smtp,
        auth: {
            user: smtp.user,
            pass: smtp.pass,
        },
        });
    }

    private async send(template: string, subject: string) {
        // Generate HTML template based on the template string
        const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
            subject,
            url: this.url,
        });
        // Create mailOptions
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: convert(html),
            html,
        };
        // Send email
        const info = await this.newTransport().sendMail(mailOptions);
        console.log(nodemailer.getTestMessageUrl(info));
    }

    async sendVerificationCode() {
        try {
            await this.send('verificationCode', 'Your account verification code');
            console.log('VerificationCode sent')
        } catch (err: any) {
            console.log(err)
        }
        
    }
    
    async sendPasswordResetToken() {
        await this.send(
            'resetPassword',
            'Your password reset token (valid for only 10 minutes)'
        );
    }
}
  