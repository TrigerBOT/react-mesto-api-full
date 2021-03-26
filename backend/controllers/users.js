const User = require('../models/user');

module.exports.getMe = (req, res, next) => {
  const token = req.headers.authorization;

  if (!isAuthorized(token)) {
    throw new ForbiddenError('Доступ запрещен');
  }

  return User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Айди неправильное ' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError('Авторизация не пройдена');
    })
    .catch(next);
};