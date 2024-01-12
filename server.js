import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares. The following is valid even after restarts.
  app.use(vite.middlewares)
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(express.json());

  app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
  });
  
  app.post('/send_email', function(req, res) {

    var email_address = req.body.email_address;
    var file_img = req.body.file_img;

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        service: 'gmail',
        auth: {
          user: 'srigon@fbk.eu',
          pass: 'bajm kizo eeuf lqvp'
        }
    });
    
    var mailOptions = {
        from: 'srigon@gmail.com',
        to: email_address,
        subject: 'Sending Email using Node.js',
        text: 'Invio mail da nodejs',
        attachDataUrls: true,
        html: '5Dculture screenshot </br> <img src="' + file_img + '">'
        
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
          // console.log(err);
          res.send({
            status: 'error'
          });
        }
        else {
          // console.log(info);
          res.send({
            status: 'success'
          });
        };
    });
  });

  app.listen(5173)

}

createServer()