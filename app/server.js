require('dotenv').config();

const   express     = require('express'),
        bodyParser  = require('body-parser'),
        ejs         = require('ejs'),
        path        = require('path'),
        nodemailer  = require('nodemailer'),
        port        = 3000;

const app = express();

// View engine setup
app.engine('ejs', ejs());
app.set('view engine', 'ejs');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {console.log(`Server listening on ${port}`)});