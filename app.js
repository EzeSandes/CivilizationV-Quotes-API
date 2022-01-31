const express = require("express");
const techRoutes = require("./routes/technologyRoutes");
const wondersRoutes = require("./routes/wondersRoutes");
const erasQuotesRoutes = require("./routes/erasRoutes");
const allQuotesRoutes = require("./routes/allQuotesRoutes");
const greatWorksRoutes = require("./routes/greatWorksRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const xss = require("xss-clean");

const app = express();

/********************************* SECURITY MIDDLEWARE ***************************** */
/************************************************************************** */

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "data:", "blob:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      scriptSrc: ["'self'", "https://*.cloudflare.com"],
      scriptSrc: ["'self'", "https://*.stripe.com"],
      scriptSrc: ["'self'", "http:", "https://*.mapbox.com", "data:"],
      frameSrc: ["'self'", "https://*.stripe.com"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "https:", "unsafe-inline"],
      workerSrc: ["'self'", "data:", "blob:"],
      childSrc: ["'self'", "blob:"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'", "blob:", "https://*.mapbox.com"],
      upgradeInsecureRequests: [],
    },
  })
);

const limiter = rateLimit({
  max: 100, // Req x IP
  windowMs: 60 * 60 * 1000, // in 1hs
  message: "Too many requests for this IP, try again in an hour.",
});

// With all routes started with '/api'
app.use("/api", limiter);

///////// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

//////// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
/********************************* MIDDLEWARES (API-App) ***************************** */
/************************************************************************** */
app.use(express.json());

app.use((req, res, next) => {
  req.reqTime = Date.now();
  next();
});

/********************************* ROUTES ******************************** */
/************************************************************************** */

app.use("/api/v1/technologies", techRoutes);
app.use("/api/v1/wonders", wondersRoutes);
app.use("/api/v1/great-works", greatWorksRoutes);
app.use("/api/v1/eras", erasQuotesRoutes);
app.use("/api/v1/all-quotes", allQuotesRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
