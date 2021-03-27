const express = require("express");

const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");

const app = express();

const { errors, celebrate, Joi } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { createUser, login } = require("./controllers/users");
const usersRout = require("./routes/usersRout");
const cardsRout = require("./routes/cardsRout");
const auth = require("./middlewares/auth");
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  if (req.method === "OPTIONS") {
    res.send(200);
  }
  next();
});

app.use('*', cors({
  origin: 'http://kirill-trigerbot.nomoredomains.icu',
  credentials: true,
}));

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(express.json());
app.use(requestLogger); // логи запросов
app.use(errorLogger);

app.post(
  "/sign-up",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(8).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
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
app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
