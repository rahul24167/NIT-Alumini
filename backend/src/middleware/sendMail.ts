import nodemailer from "nodemailer";
import { Request, Response } from "express";
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
export const sendMail = (req: Request, res: Response) => {
    const {subject, email, html, message} = req.body
    if(!subject || !html || !email || !message){
        res.json({
            message: "Body is invalid"
        });
        return;
        
    }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.json({
        message: message,
      });
  return;
};
