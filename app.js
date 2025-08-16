const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp')
const express_mongo_sanitize= require('express-mongo-sanitize');
const xss=require('xss-clean');
const compression = require('compression');



require('dotenv').config();

const app = express();

app.use(compression()); 

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));




const allowedOrigins = [
    'https://akarat-front.vercel.app',
    'https://akarat-six.vercel.app',
    'https://helioin.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 



const LIMIT = '500kb';
app.use(bodyParser.json({ limit: LIMIT, extended: true }));
app.use(bodyParser.urlencoded({ limit: LIMIT, extended: true }));
app.use(express.json({ limit: LIMIT }));

app.use(cookieParser());

const ratelimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    message: "Too many requests from this IP, please try again later.",
});

 app.use(ratelimiter); 
 app.use(hpp())
 app.use(express_mongo_sanitize())
 app.use(xss())


 app.set('trust proxy', 1);



const connection = require('./config/config');
connection();



const dashboardRouter = require('./routers/dashboardRouter');
const websiteRouter = require('./routers/websiteRouter');




app.use('/app/dashboard', dashboardRouter); 
app.use('/app/website', websiteRouter);




// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
}, express.static(path.join(__dirname, 'uploads')));





app.all('*', (req, res, next) => {
  const error = new Error(`Can't find this route ${req.originalUrl}`);
  next(error); 
});


app.use((err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message 
  });
});


const port = 5000;

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
