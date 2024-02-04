import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(password: string) {
    const htmlContent = `<html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f3f3f3;
          border-radius: 10px;
        }
        .title {
          color: #333;
          font-size: 24px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">Ваш новый пароль:</h1>
        <p>${password}</p>
      </div>
    </body>
  </html>
`
    try {
      await this.mailerService.sendMail({
        from: 'orkinevgenij@gmail.com',
        to: 'orkinevgenij@gmail.com',
        subject: 'work_app',
        html: htmlContent,
      })
      return true
    } catch (error) {
      console.log('error', error)
    }
  }
}
