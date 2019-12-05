require('dotenv').config();

const   express     = require('express'),
        bodyParser  = require('body-parser'),
        ejs         = require('ejs'),
        path        = require('path'),
        nodemailer  = require('nodemailer'),
        port        = 3000;

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.get('/', (req, res) => {
    res.render('index.ejs', {msg:''});
});

app.post('/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.eu.mailgun.org',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
    });
    const output = 
    `
    <p>Hay un nuevo mensaje a través de la página web</p>
    <h3>Usuario</h3>
    <ul>  
      <li>Nombre: ${req.body.name}</li>
      <li>Empresa: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Tel.: ${req.body.phone}</li>
    </ul>
    <h3>Mensaje</h3>
    <p>${req.body.message}</p>
    `;
    let mailOptions = {
        from: '"Contact-Form with Nodemailer" <mail@jorisraymaekers.com>', // sender address
        to: 'joris@jorisr.com', // list of receivers
        subject: 'Mensaje a través de la página web', // Subject line
        text: `${req.body.message}`, // plain text body
        html: output // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        res.render('index.ejs', {msg:'Tu mensaje has sido enviado.'});
    });
});

app.listen(port, () => {console.log(`Server listening on ${port}`)});