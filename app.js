const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const express_mongo_sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
require('dotenv').config();

const app = express();

// ================== Security & Performance ==================
app.use(compression());

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

const allowedOrigins = [
  'https://helioin.vercel.app',
  'https://akarat-six.vercel.app',
  'https://akarat-front.vercel.app' 
];

// CORS Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// للتأكد إن preflight requests (OPTIONS) بيرجع 200
app.options('*', cors());

// ================== Parsers ==================
const LIMIT = '500kb';
app.use(bodyParser.json({ limit: LIMIT, extended: true }));
app.use(bodyParser.urlencoded({ limit: LIMIT, extended: true }));
app.use(express.json({ limit: LIMIT }));
app.use(cookieParser());

// ================== Security Middlewares ==================
const ratelimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(ratelimiter);
app.use(hpp());
app.use(express_mongo_sanitize());
app.use(xss());

app.set('trust proxy', 1);

// ================== Database Connection ==================
const connection = require('./config/config');
connection();

// ================== Routes ==================
const dashboardRouter = require('./routers/dashboardRouter');
const websiteRouter = require('./routers/websiteRouter');

app.use('/app/dashboard', dashboardRouter);
app.use('/app/website', websiteRouter);

// Static uploads with CORS
app.use('/uploads', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}), express.static(path.join(__dirname, 'uploads')));

// ================== Error Handling ==================
app.all('*', (req, res, next) => {
  const error = new Error(`Can't find this route ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================== Server ==================
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
