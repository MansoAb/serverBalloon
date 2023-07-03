const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports.userController = {
  signUp: async (req, res) => {
    const {login, password } = req.body
    console.log(login, password)
        try {
            const result = await User.findOne({ email: login });
              if (result) {
                return res.json({
                  error: "Пользователь с таким логином уже существует",
                });
              }
            const hash = await bcrypt.hash(password, Number("rwi&*hgfh<fghjsdf?/,"));
            
            await User.create({email: login, password: hash})
            res.json("Ресторан зарегистрирован.")
        } catch (error) {
            res.json(Error)
        }
   },
   sendEmailWithCode: async (req, res) => {

        const { code } = req.body;
        console.log(code)
        try {
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });

        
    
          const mailOptions = {
            from: "tagvu86@gmail.com",
            to: "tagvu86@gmail.com",
            subject: "Новый пользователь.",
            text: `Новый пользователь зарегистрирован.`,
          };
    
          const mailClientOptions = {
            from: "tagvu86@gmail.com",
            to: "tagvu86@gmail.com",
            subject: "КОД ПОДТВЕРЖДЕНИЯ",
            text: `
Ваш проверочный код для регистрации в Pitiprey.

Не сообщайте его никому.   

${code}`,
          };
    
          await transporter.sendMail(mailOptions);
          await transporter.sendMail(mailClientOptions);
    
          return res.json("Форма отправлена.");
        } catch (error) {
          return res.json(error);
        }
      }
   }

