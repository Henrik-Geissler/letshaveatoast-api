/**
 * Copyright (c) 2020, Henrik Geißler
 */
// TODO: Mailer
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("testAccount", testAccount);

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // true for 465, false for other ports
    auth: {
      // generated ethereal user
      pass: 'xJsQzVAuFYKqx5xUR9',
      user: 'henrik.geissler@gmail.com', // generated ethereal password
    },

    host: 'smtp.ethereal.email',

    port: 587,
    secure: false,
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',

    // Subject line
    html,

    // list of receivers
    subject: 'Change password',
    // sender address
    to,
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
