#!/usr/bin/env node

// Library
const prompt = require('prompt');
const nodemailer = require('nodemailer');

// 
// Start the prompt 
// 
prompt.start();

prompt.get(['service','mail','password','receiver','subject','mailtext'], (err, result) => {

        // Send Mail
        for( var i = 0; i < result.receiver.split(',').length; i++ )
        {
            let transporter = nodemailer.createTransport({
                service: `${result.service}`,
                auth: {
                    user: `${result.mail}`,
                    pass: `${result.password}`
                }
            });

            let mailOptions = {
                from: `"${result.mail}" <${result.mail}>`, 
                to: `${result.receiver.split(',')[i]}`, 
                subject: `${result.subject}`,
                html: `${result.mailtext}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    return console.log(error);
                console.log('Mail Sent Successfully:', info.messageId, info.response);
            });
        }

});