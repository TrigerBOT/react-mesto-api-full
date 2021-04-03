const express = require("express");
const { PORT = 3001 } = process.env;
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const { errors, celebrate, Joi } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { createUser, login } = require("./controllers/users");
const usersRout = require("./routes/usersRout");
const cardsRout = require("./routes/cardsRout");
const NotFoundError = require('./errors/not-found-err');
const auth = require("./middlewares/auth");
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true
});
const cors = require("cors");
app.use(express.json());
const options = {
  origin: [
    "http://localhost:3000",
    "https://kirill-trigerbot.nomoredomains.icu",
    "https://TrigerBOT.github.io",
  ],

};
app.use(cors(options));
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(requestLogger);

// логи запросов

app.post(
  "/sign-up",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(8).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().trim().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);
app.post(
  "/sign-in",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.use(auth);
app.use("/users", usersRout);
app.use("/cards", cardsRout);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use((req, res, err) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
